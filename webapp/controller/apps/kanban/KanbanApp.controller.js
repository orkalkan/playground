sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel"
], (BaseController, JSONModel) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.kanban.KanbanApp", {

    onInit() {
      const initialData = {
        backlog: [
          { id: "T-001", title: "Design authentication flow for mobile app", assignee: "Anna Weber",   priority: "High",   points: 8,  sprint: "sprint1" },
          { id: "T-002", title: "Write unit tests for payment module",        assignee: "Ben Schulz",  priority: "Medium", points: 5,  sprint: "sprint1" },
          { id: "T-003", title: "Refactor legacy data import pipeline",       assignee: "Clara Fischer",priority: "Low",    points: 13, sprint: "sprint1" },
          { id: "T-004", title: "Create API documentation for v2 endpoints",  assignee: "David Müller",priority: "Medium", points: 3,  sprint: "sprint2" },
          { id: "T-005", title: "Investigate memory leak in background jobs", assignee: "Eva Braun",   priority: "High",   points: 5,  sprint: "sprint2" }
        ],
        inProgress: [
          { id: "T-006", title: "Implement dark mode for dashboard UI",       assignee: "Felix Keller",  priority: "Medium", points: 5,  sprint: "sprint1" },
          { id: "T-007", title: "Set up CI/CD pipeline for staging environment", assignee: "Anna Weber", priority: "High",   points: 8,  sprint: "sprint1" }
        ],
        review: [
          { id: "T-008", title: "Code review: search filter component",       assignee: "Ben Schulz",  priority: "Medium", points: 3,  sprint: "sprint1" }
        ],
        done: [
          { id: "T-009", title: "Update Node.js dependencies to latest LTS",  assignee: "Clara Fischer",priority: "Low",    points: 2,  sprint: "sprint1" },
          { id: "T-010", title: "Fix date formatting bug in invoice export",  assignee: "David Müller",priority: "High",   points: 3,  sprint: "sprint1" }
        ],
        backlogCount: 5,
        inProgressCount: 2,
        reviewCount: 1,
        doneCount: 2
      };

      this._allData = {
        backlog:    initialData.backlog.slice(),
        inProgress: initialData.inProgress.slice(),
        review:     initialData.review.slice(),
        done:       initialData.done.slice()
      };

      this._searchQuery = "";
      this._priorityFilter = "all";

      const model = new JSONModel(initialData);
      this.getView().setModel(model, "kanban");
    },

    onNavBackToLaunchpad() {
      this.navBackToLaunchpad();
    },

    onFilterChange() {
      this._applyFilters();
    },

    onSearchChange(event) {
      this._searchQuery = event.getParameter("newValue").toLowerCase();
      this._applyFilters();
    },

    _applyFilters() {
      const sprintKey = this.byId("sprintSelect").getSelectedKey();
      const priorityKey = this.byId("prioritySelect").getSelectedKey();
      const query = this._searchQuery;

      const filterItem = (item) => {
        if (item.sprint !== sprintKey && sprintKey !== "all") return false;
        if (priorityKey !== "all" && item.priority !== priorityKey) return false;
        if (query && !item.title.toLowerCase().includes(query) && !item.assignee.toLowerCase().includes(query)) return false;
        return true;
      };

      const model = this.getView().getModel("kanban");
      const filtered = {
        backlog:    this._allData.backlog.filter(filterItem),
        inProgress: this._allData.inProgress.filter(filterItem),
        review:     this._allData.review.filter(filterItem),
        done:       this._allData.done.filter(filterItem)
      };

      model.setProperty("/backlog",         filtered.backlog);
      model.setProperty("/inProgress",      filtered.inProgress);
      model.setProperty("/review",          filtered.review);
      model.setProperty("/done",            filtered.done);
      model.setProperty("/backlogCount",    filtered.backlog.length);
      model.setProperty("/inProgressCount", filtered.inProgress.length);
      model.setProperty("/reviewCount",     filtered.review.length);
      model.setProperty("/doneCount",       filtered.done.length);
    },

    onDrop(event) {
      const draggedControl  = event.getParameter("draggedControl");
      const droppedControl  = event.getParameter("droppedControl");
      const dropPosition    = event.getParameter("dropPosition");
      const sourceList      = draggedControl.getParent();
      const targetList      = droppedControl ? droppedControl.getParent() : event.getSource().getDropTarget();

      if (!sourceList || !targetList || sourceList === targetList) return;

      const sourceColumnKey = this._getColumnKey(sourceList);
      const targetColumnKey = this._getColumnKey(targetList);

      if (!sourceColumnKey || !targetColumnKey) return;

      const draggedItem = draggedControl.getBindingContext("kanban").getObject();
      const model       = this.getView().getModel("kanban");

      // Remove from source
      const sourceArr = this._allData[sourceColumnKey];
      const sourceIdx = sourceArr.findIndex((item) => item.id === draggedItem.id);
      if (sourceIdx === -1) return;
      sourceArr.splice(sourceIdx, 1);

      // Add to target
      const targetArr = this._allData[targetColumnKey];
      if (droppedControl) {
        const droppedItem = droppedControl.getBindingContext("kanban").getObject();
        const targetIdx   = targetArr.findIndex((item) => item.id === droppedItem.id);
        const insertAt    = dropPosition === "Before" ? targetIdx : targetIdx + 1;
        targetArr.splice(insertAt, 0, draggedItem);
      } else {
        targetArr.push(draggedItem);
      }

      model.setProperty("/" + sourceColumnKey, sourceArr.slice());
      model.setProperty("/" + targetColumnKey, targetArr.slice());
      model.setProperty("/backlogCount",    this._allData.backlog.length);
      model.setProperty("/inProgressCount", this._allData.inProgress.length);
      model.setProperty("/reviewCount",     this._allData.review.length);
      model.setProperty("/doneCount",       this._allData.done.length);
      model.refresh(true);
    },

    _getColumnKey(list) {
      const listId = list.getId();
      if (listId.endsWith("backlogList"))    return "backlog";
      if (listId.endsWith("inProgressList")) return "inProgress";
      if (listId.endsWith("reviewList"))     return "review";
      if (listId.endsWith("doneList"))       return "done";
      return null;
    },

    onAddTaskPress() {
      this.byId("addTaskDialog").open();
    },

    onAddTaskCancel() {
      this.byId("addTaskDialog").close();
      this._resetAddTaskDialog();
    },

    onAddTaskConfirm() {
      const title    = this.byId("newTaskTitle").getValue().trim();
      const assignee = this.byId("newTaskAssignee").getValue().trim() || "Unassigned";
      const priority = this.byId("newTaskPriority").getSelectedKey();
      const points   = this.byId("newTaskPoints").getValue();
      const sprint   = this.byId("sprintSelect").getSelectedKey();

      if (!title) {
        this.byId("newTaskTitle").setValueState("Error");
        this.byId("newTaskTitle").setValueStateText("Task title is required");
        return;
      }

      const newTask = {
        id:       `T-${String(Date.now()).slice(-4)}`,
        title,
        assignee,
        priority,
        points,
        sprint
      };

      this._allData.backlog.unshift(newTask);

      const model = this.getView().getModel("kanban");
      model.setProperty("/backlog", this._allData.backlog.slice());
      model.setProperty("/backlogCount", this._allData.backlog.length);

      this.byId("addTaskDialog").close();
      this._resetAddTaskDialog();
      this.toast(`Task "${title}" added to Backlog`);
    },

    _resetAddTaskDialog() {
      this.byId("newTaskTitle").setValue("").setValueState("None");
      this.byId("newTaskAssignee").setValue("");
      this.byId("newTaskPriority").setSelectedKey("Medium");
      this.byId("newTaskPoints").setValue(3);
    },

    onAssigneeSuggest(event) {
      // Suggestions are static items already set in XML — nothing to do dynamically
      event.getSource().suggest();
    },

    formatPriorityState(priority) {
      const map = { "High": "Error", "Medium": "Warning", "Low": "None" };
      return map[priority] || "None";
    }

  });
});
