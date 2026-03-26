sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageBox"
], (BaseController, JSONModel, Filter, FilterOperator, MessageBox) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.helpdesk.HelpdeskApp", {

    onInit() {
      const data = {
        tickets: [
          { id: "INC-2025-0820", subject: "SAP GUI crashes on login", category: "Software / Application", categoryKey: "software", priority: "Critical", status: "In Progress", assignee: "Level 2 — K. Braun", assigneeKey: "l2-braun", createdAt: "2025-03-15", slaTarget: "4h — BREACHED", activity: [{ author: "System", action: "Ticket created", note: "Auto-assigned to Level 1", timestamp: "2025-03-15", icon: "sap-icon://create" }, { author: "K. Braun (L2)", action: "In progress", note: "Investigating SAP kernel version mismatch", timestamp: "2025-03-15", icon: "sap-icon://activity-2" }] },
          { id: "INC-2025-0819", subject: "Cannot access shared network drive", category: "Network / Connectivity", categoryKey: "network", priority: "High", status: "Open", assignee: "Level 1 — M. Vogel", assigneeKey: "l1-vogel", createdAt: "2025-03-14", slaTarget: "8h — 4h remaining", activity: [{ author: "System", action: "Ticket created", note: "Assigned to network team", timestamp: "2025-03-14", icon: "sap-icon://create" }] },
          { id: "INC-2025-0818", subject: "Password reset request — inactive account", category: "Access & Permissions", categoryKey: "access", priority: "Medium", status: "Open", assignee: "Level 1 — S. Maier", assigneeKey: "l1-maier", createdAt: "2025-03-14", slaTarget: "24h — 18h remaining", activity: [] },
          { id: "INC-2025-0817", subject: "Outlook not syncing on mobile", category: "Email / Collaboration", categoryKey: "email", priority: "Medium", status: "In Progress", assignee: "Level 1 — T. Lange", assigneeKey: "l1-lange", createdAt: "2025-03-13", slaTarget: "24h — resolved before breach", activity: [] },
          { id: "INC-2025-0816", subject: "Monitor flickering — Dell U2724D", category: "Hardware Issue", categoryKey: "hardware", priority: "Low", status: "Open", assignee: "Facilities", assigneeKey: "facilities", createdAt: "2025-03-12", slaTarget: "72h — 48h remaining", activity: [] },
          { id: "INC-2025-0815", subject: "VPN intermittent disconnects", category: "Network / Connectivity", categoryKey: "network", priority: "High", status: "Resolved", assignee: "Level 2 — K. Braun", assigneeKey: "l2-braun", createdAt: "2025-03-10", slaTarget: "8h — resolved on time", activity: [] },
          { id: "INC-2025-0814", subject: "Print spooler stuck — floor 3 printer", category: "Hardware Issue", categoryKey: "hardware", priority: "Low", status: "Resolved", assignee: "Facilities", assigneeKey: "facilities", createdAt: "2025-03-08", slaTarget: "72h — resolved on time", activity: [] },
          { id: "INC-2025-0813", subject: "Phishing email — suspicious attachment opened", category: "Security Incident", categoryKey: "security", priority: "Critical", status: "In Progress", assignee: "Level 2 — K. Braun", assigneeKey: "l2-braun", createdAt: "2025-03-07", slaTarget: "2h — BREACHED", activity: [] },
          { id: "INC-2025-0812", subject: "SAP transaction SU01 authorization missing", category: "Access & Permissions", categoryKey: "access", priority: "High", status: "Open", assignee: "Level 1 — S. Maier", assigneeKey: "l1-maier", createdAt: "2025-03-06", slaTarget: "8h — 2h remaining", activity: [] },
          { id: "INC-2025-0811", subject: "Laptop battery drains rapidly", category: "Hardware Issue", categoryKey: "hardware", priority: "Low", status: "Closed", assignee: "Facilities", assigneeKey: "facilities", createdAt: "2025-03-05", slaTarget: "72h — resolved on time", activity: [] },
          { id: "INC-2025-0810", subject: "Teams calls dropping after 10 minutes", category: "Network / Connectivity", categoryKey: "network", priority: "Medium", status: "In Progress", assignee: "Level 1 — M. Vogel", assigneeKey: "l1-vogel", createdAt: "2025-03-04", slaTarget: "24h — 6h remaining", activity: [] },
          { id: "INC-2025-0809", subject: "Excel macro not running — security policy", category: "Software / Application", categoryKey: "software", priority: "Medium", status: "Resolved", assignee: "Level 1 — T. Lange", assigneeKey: "l1-lange", createdAt: "2025-03-03", slaTarget: "24h — resolved on time", activity: [] }
        ],
        selectedTicket: null,
        editTicket: null
      };
      this.getView().setModel(new JSONModel(data), "helpdesk");
    },

    onNavBack() { this.byId("helpdeskNav").back(); },
    onNavBackToLaunchpad() { this.navBackToLaunchpad(); },

    onNewTicketPress() { this.byId("helpdeskNav").to(this.byId("ticketCreatePage")); },

    onTicketPress(event) {
      const ctx = event.getSource().getBindingContext("helpdesk");
      this.getView().getModel("helpdesk").setProperty("/selectedTicket", ctx.getObject());
      this._selectedTicketPath = ctx.getPath();
      this.byId("helpdeskNav").to(this.byId("ticketDetailPage"));
    },

    onEditTicketPress() {
      const model = this.getView().getModel("helpdesk");
      const ticket = model.getProperty("/selectedTicket");
      model.setProperty("/editTicket", Object.assign({}, ticket));
      this.byId("helpdeskNav").to(this.byId("ticketEditPage"));
    },

    onSaveTicket() {
      const model = this.getView().getModel("helpdesk");
      const editTicket = model.getProperty("/editTicket");
      const priority = this.byId("editTicketPriority").getSelectedKey();
      const status = this.byId("editTicketStatus").getSelectedKey();
      const subject = this.byId("editTicketSubject").getValue();
      editTicket.priority = priority;
      editTicket.status = status;
      editTicket.subject = subject;
      if (this._selectedTicketPath) {
        model.setProperty(this._selectedTicketPath + "/priority", priority);
        model.setProperty(this._selectedTicketPath + "/status", status);
        model.setProperty(this._selectedTicketPath + "/subject", subject);
        model.setProperty("/selectedTicket/priority", priority);
        model.setProperty("/selectedTicket/status", status);
        model.setProperty("/selectedTicket/subject", subject);
        model.refresh(true);
      }
      this.toast("Ticket updated");
      this.byId("helpdeskNav").back();
    },

    onDeleteTicketPress(event) {
      event.stopPropagation ? event.stopPropagation() : null;
      const ctx = event.getSource().getBindingContext("helpdesk");
      const ticket = ctx.getObject();
      MessageBox.confirm(`Delete ticket ${ticket.id}: "${ticket.subject}"?`, {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("helpdesk");
          const tickets = model.getProperty("/tickets");
          const idx = tickets.indexOf(ticket);
          if (idx !== -1) {
            tickets.splice(idx, 1);
            model.setProperty("/tickets", tickets);
            model.refresh(true);
          }
          this.toast("Ticket deleted");
        }
      });
    },

    onSearch(event) {
      const query = event.getParameter("query");
      const binding = this.byId("ticketList").getBinding("items");
      binding.filter(!query ? [] : [new Filter({ filters: [new Filter("id", FilterOperator.Contains, query), new Filter("subject", FilterOperator.Contains, query)], and: false })]);
    },

    onPriorityFilter(event) {
      const key = event.getParameter("selectedItem").getKey();
      const binding = this.byId("ticketList").getBinding("items");
      binding.filter(key === "all" ? [] : [new Filter("priority", FilterOperator.EQ, key)]);
    },

    onSubmitTicket() {
      const model = this.getView().getModel("helpdesk");
      const tickets = model.getProperty("/tickets");
      const subject = this.byId("newTicketSubject").getValue() || "New Issue";
      const priority = this.byId("newTicketPriority").getSelectedKey();
      const category = this.byId("newTicketCategory").getSelectedKey();
      const newId = `INC-2025-${String(tickets.length + 821).padStart(4, "0")}`;
      tickets.unshift({
        id: newId,
        subject,
        category,
        categoryKey: category,
        priority,
        status: "Open",
        assignee: "Level 1 — M. Vogel",
        assigneeKey: "l1-vogel",
        createdAt: new Date().toISOString().split("T")[0],
        slaTarget: "24h",
        activity: []
      });
      model.setProperty("/tickets", tickets);
      model.refresh(true);
      this.toast(`Ticket ${newId} submitted · Assigned to Level 1 support`);
      this.byId("helpdeskNav").back();
    },

    onCloseTicket() {
      const model = this.getView().getModel("helpdesk");
      model.setProperty("/selectedTicket/status", "Resolved");
      if (this._selectedTicketPath) {
        model.setProperty(this._selectedTicketPath + "/status", "Resolved");
        model.refresh(true);
      }
      this.toast("Ticket closed");
      this.byId("helpdeskNav").back();
    },

    onPostNote() {
      const note = this.byId("workNoteText").getValue();
      if (!note) return;
      const model = this.getView().getModel("helpdesk");
      const activity = model.getProperty("/selectedTicket/activity") || [];
      activity.push({ author: "Current User", action: "Work note added", note, timestamp: new Date().toISOString().split("T")[0], icon: "sap-icon://comment" });
      model.setProperty("/selectedTicket/activity", activity);
      this.byId("workNoteText").setValue("");
      this.toast("Note posted");
    },

    formatDate(dateStr) {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("de-DE");
    },

    formatPriorityIcon(priority) {
      const map = { "Critical": "sap-icon://alert", "High": "sap-icon://warning2", "Medium": "sap-icon://status-in-process", "Low": "sap-icon://status-completed" };
      return map[priority] || "sap-icon://status-in-process";
    },

    formatPriorityColor(priority) {
      const map = { "Critical": "#BB0000", "High": "#E9730C", "Medium": "#0070F2", "Low": "#8c8c8c" };
      return map[priority] || "#8c8c8c";
    },

    formatPriorityState(priority) {
      const map = { "Critical": "Error", "High": "Warning", "Medium": "None", "Low": "None" };
      return map[priority] || "None";
    },

    formatStatusState(status) {
      const map = { "Open": "Warning", "In Progress": "Warning", "Resolved": "Success", "Closed": "None" };
      return map[status] || "None";
    }

  });
});
