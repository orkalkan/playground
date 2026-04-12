sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/Dialog",
  "sap/m/Button",
  "sap/m/Label",
  "sap/m/Text",
  "sap/m/Input",
  "sap/m/Select",
  "sap/m/Table",
  "sap/m/Column",
  "sap/m/ColumnListItem",
  "sap/m/Bar",
  "sap/m/VBox",
  "sap/m/FlexBox",
  "sap/m/Title",
  "sap/m/ObjectStatus",
  "sap/ui/core/Item"
], (BaseController, JSONModel, Dialog, Button, Label, Text,
    MInput, Select, MTable, Column, ColumnListItem,
    Bar, VBox, FlexBox, Title, ObjectStatus, CoreItem) => {
  "use strict";

  // ── Reference data ─────────────────────────────────────────────────────────

  const SKILLS_LIST = [
    { key: "UI5",        text: "UI5",          category: "Frontend",  level: "Expert"       },
    { key: "Fiori",      text: "Fiori",         category: "Frontend",  level: "Expert"       },
    { key: "ABAP",       text: "ABAP",          category: "Backend",   level: "Advanced"     },
    { key: "OData",      text: "OData",         category: "Backend",   level: "Advanced"     },
    { key: "React",      text: "React",         category: "Frontend",  level: "Advanced"     },
    { key: "Node.js",    text: "Node.js",       category: "Backend",   level: "Advanced"     },
    { key: "Python",     text: "Python",        category: "Backend",   level: "Intermediate" },
    { key: "Java",       text: "Java",          category: "Backend",   level: "Advanced"     },
    { key: "SQL",        text: "SQL",           category: "Database",  level: "Advanced"     },
    { key: "Docker",     text: "Docker",        category: "DevOps",    level: "Intermediate" },
    { key: "Scrum",      text: "Scrum",         category: "Agile",     level: "Expert"       },
    { key: "SAP-HCM",   text: "SAP-HCM",       category: "SAP",       level: "Advanced"     },
    { key: "SAP-FI",    text: "SAP-FI",        category: "SAP",       level: "Advanced"     },
    { key: "SAP-MM",    text: "SAP-MM",        category: "SAP",       level: "Advanced"     },
    { key: "Recruiting", text: "Recruiting",    category: "HR",        level: "Expert"       },
    { key: "Payroll",    text: "Payroll",       category: "HR",        level: "Advanced"     }
  ];

  const LANGUAGES_LIST = [
    { key: "en", text: "English",    native: "English",    region: "Global"  },
    { key: "de", text: "German",     native: "Deutsch",    region: "DACH"    },
    { key: "fr", text: "French",     native: "Français",   region: "Western" },
    { key: "es", text: "Spanish",    native: "Español",    region: "LATAM"   },
    { key: "it", text: "Italian",    native: "Italiano",   region: "Western" },
    { key: "nl", text: "Dutch",      native: "Nederlands", region: "Western" },
    { key: "pl", text: "Polish",     native: "Polski",     region: "Eastern" },
    { key: "pt", text: "Portuguese", native: "Português",  region: "LATAM"   }
  ];

  const MANAGERS_LIST = [
    { key: "MG001", text: "Maria Garcia",  department: "Engineering", role: "Engineering Lead", location: "Berlin"    },
    { key: "MG002", text: "Klaus Weber",   department: "Engineering", role: "Backend Lead",     location: "Munich"    },
    { key: "MG003", text: "Peter Mueller", department: "Frontend",    role: "UI5 Tech Lead",    location: "Frankfurt" },
    { key: "MG004", text: "Sarah Chen",    department: "QA",          role: "QA Lead",          location: "Hamburg"   },
    { key: "MG005", text: "John Smith",    department: "HR",          role: "HR Director",      location: "Berlin"    }
  ];

  const MANAGER_LABEL = MANAGERS_LIST.reduce((acc, m) => { acc[m.key] = m.text; return acc; }, {});

  const COST_CENTERS_LIST = [
    { key: "CC-1001", text: "IT Operations",      dept: "IT",  manager: "Maria Garcia",  budget: "250,000" },
    { key: "CC-1002", text: "IT Development",     dept: "IT",  manager: "Klaus Weber",   budget: "180,000" },
    { key: "CC-2001", text: "Human Resources",    dept: "HR",  manager: "John Smith",    budget: "120,000" },
    { key: "CC-3001", text: "Finance & Control",  dept: "FI",  manager: "Sarah Chen",    budget: "90,000"  },
    { key: "CC-4001", text: "Sales Operations",   dept: "SD",  manager: "Peter Mueller", budget: "200,000" },
    { key: "CC-5001", text: "Procurement",        dept: "MM",  manager: "Maria Garcia",  budget: "150,000" },
    { key: "CC-6001", text: "Quality Management", dept: "QM",  manager: "Klaus Weber",   budget: "80,000"  },
    { key: "CC-7001", text: "Project Office",     dept: "PM",  manager: "John Smith",    budget: "170,000" }
  ];

  // Value-help table column config per field
  const VH_CONFIG = {
    skills: {
      title:       "Select Skills",
      multiSelect: true,
      isArray:     true,
      columns: [
        { label: "Code",     field: "key",      width: "5rem", filter: "input"  },
        { label: "Skill",    field: "text",     width: "9rem", filter: "input"  },
        { label: "Category", field: "category", width: "9rem", filter: "select",
          options: ["Frontend","Backend","Database","DevOps","Agile","SAP","HR"] },
        { label: "Level",    field: "level",    filter: "select",
          options: ["Expert","Advanced","Intermediate"] }
      ],
      items: SKILLS_LIST
    },
    languages: {
      title:       "Select Languages",
      multiSelect: true,
      isArray:     true,
      columns: [
        { label: "Code",     field: "key",    width: "4rem", filter: "input"  },
        { label: "Language", field: "text",   width: "9rem", filter: "input"  },
        { label: "Native",   field: "native", width: "9rem", filter: "input"  },
        { label: "Region",   field: "region", filter: "select",
          options: ["Global","DACH","Western","LATAM","Eastern"] }
      ],
      items: LANGUAGES_LIST
    },
    manager: {
      title:       "Select Manager",
      multiSelect: false,
      isArray:     false,
      columns: [
        { label: "ID",         field: "key",        width: "5rem",  filter: "input"  },
        { label: "Name",       field: "text",        width: "10rem", filter: "input"  },
        { label: "Department", field: "department",  width: "9rem",  filter: "select",
          options: ["Engineering","Frontend","QA","HR"] },
        { label: "Role",       field: "role",        width: "10rem", filter: "input"  },
        { label: "Location",   field: "location",    filter: "select",
          options: ["Berlin","Munich","Frankfurt","Hamburg"] }
      ],
      items: MANAGERS_LIST
    },
    costCenter: {
      title:       "Select Cost Center",
      multiSelect: false,
      isArray:     false,
      columns: [
        { label: "Code",         field: "key",     width: "7rem",  filter: "input"  },
        { label: "Description",  field: "text",    width: "13rem", filter: "input"  },
        { label: "Department",   field: "dept",    width: "7rem",  filter: "select",
          options: ["IT","HR","FI","SD","MM","QM","PM"] },
        { label: "Manager",      field: "manager", width: "11rem", filter: "input"  },
        { label: "Budget (EUR)", field: "budget"  }
      ],
      items: COST_CENTERS_LIST
    }
  };

  // ── Employee generator ─────────────────────────────────────────────────────

  const FIRST_NAMES  = ["Anna","Peter","Maria","Klaus","Sarah","John","Emma","Thomas","Lisa","Michael","Sophie","Daniel","Laura","Stefan","Julia","Martin","Nina","Felix","Hannah","Lukas"];
  const LAST_NAMES   = ["Koch","Mueller","Garcia","Weber","Chen","Smith","Fischer","Bauer","Wagner","Richter","Schneider","Hoffmann","Schmidt","Meyer","Wolf","Schulz","Braun","Becker"];
  const DEPARTMENTS  = ["IT","HR","FI","SD","MM","QM","PM"];
  const ROLES        = { IT:["Frontend Dev","Backend Dev","UI5 Developer","DevOps Engineer","Architect","QA Engineer"], HR:["HR Business Partner","Recruiter","Training Specialist","Payroll Specialist"], FI:["Financial Analyst","Controller","Accountant","Tax Specialist"], SD:["Sales Manager","Account Executive","Pre-Sales Consultant","Sales Coordinator"], MM:["Buyer","Procurement Specialist","Supply Chain Analyst","Vendor Manager"], QM:["Quality Inspector","QM Coordinator","Auditor","Lab Technician"], PM:["Project Manager","Scrum Master","Program Manager","PMO Analyst"] };
  const DEPT_SKILLS  = { IT:[["UI5","Fiori"],["React","Node.js"],["Python","SQL"],["Java","Docker"],["ABAP","OData"],["Scrum","Docker"]], HR:[["Recruiting","SAP-HCM"],["Payroll","SAP-HCM"],["Recruiting","Scrum"]], FI:[["SAP-FI","SQL"],["SAP-FI","Python"],["SQL","Scrum"]], SD:[["Fiori","SAP-MM"],["Scrum","React"],["SAP-FI","SQL"]], MM:[["SAP-MM","SQL"],["SAP-MM","ABAP"],["OData","SAP-MM"]], QM:[["Scrum","SQL"],["Python","SQL"],["Java","Scrum"]], PM:[["Scrum","Fiori"],["Scrum","SQL"],["React","Scrum"]] };
  const CONTRACTS    = ["permanent","fixed","contractor","intern"];
  const LOCATIONS    = ["berlin","munich","frankfurt","hamburg","remote"];
  const MANAGERS_K   = ["MG001","MG002","MG003","MG004","MG005"];
  const COST_CENTERS = ["CC-1001","CC-1002","CC-2001","CC-3001","CC-4001"];
  const PROJECTS     = ["proj-tf","proj-erp","proj-int","proj-mig","proj-inf"];
  const LANG_SETS    = [["en"],["en","de"],["en","fr"],["en","de","fr"],["en","es"],["de"],["en","it"],["en","nl"]];
  const HIRE_DATES   = ["2019-03-15","2020-07-01","2021-01-10","2021-09-20","2022-04-05","2022-11-15","2023-02-28","2023-06-01","2024-01-08","2024-09-16"];
  const HOURS_LIST   = ["40","32","45","20"];

  function generateEmployees() {
    const out = [];
    for (let i = 0; i < 60; i++) {
      const dept = DEPARTMENTS[i % DEPARTMENTS.length];
      out.push({
        empId:       `EMP-${String(i + 1).padStart(3, "0")}`,
        fullName:    `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[i % LAST_NAMES.length]}`,
        department:  dept,
        role:        ROLES[dept][i % ROLES[dept].length],
        skills:      DEPT_SKILLS[dept][i % DEPT_SKILLS[dept].length].slice(),
        hireDate:    HIRE_DATES[i % HIRE_DATES.length],
        contract:    CONTRACTS[i % CONTRACTS.length],
        active:      i % 7 !== 6,
        remote:      i % 3 === 0,
        location:    LOCATIONS[i % LOCATIONS.length],
        manager:     MANAGERS_K[i % MANAGERS_K.length],
        salaryGrade: 3 + (i % 6),
        targetBonus: [5,8,10,12,15,20][i % 6],
        annualLeave: [20,22,24,25,26,28,30][i % 7],
        weeklyHours: HOURS_LIST[i % HOURS_LIST.length],
        reviewScore: 2 + (i % 4),
        costCenter:  COST_CENTERS[i % COST_CENTERS.length],
        project:     PROJECTS[i % PROJECTS.length],
        languages:   LANG_SETS[i % LANG_SETS.length].slice(),
        notes:       ""
      });
    }
    return out;
  }

  const deepCopy = (o) => JSON.parse(JSON.stringify(o));

  // ── Controller ──────────────────────────────────────────────────────────────

  return BaseController.extend("ui5.fira.demos.controller.apps.hrgrid.HRGridApp", {

    onInit() {
      this._allEmployees   = generateEmployees();
      this._savedEmployees = deepCopy(this._allEmployees);
      this._activeFilters  = { dept: "", status: "all", search: "" };
      this._vhContext      = null;
      this._vhSelectedKeys = null;

      this.getView().setModel(new JSONModel({
        employees:     deepCopy(this._allEmployees),
        filteredCount: this._allEmployees.length,
        dirty:         false,
        showSummary:   false,
        summaryText:   ""
      }), "hr");
    },

    onFieldChange() {
      const oModel = this.getView().getModel("hr");
      if (oModel.getProperty("/dirty")) return;
      oModel.setProperty("/dirty", true);
      oModel.setProperty("/showSummary", false);
    },

    onSave() {
      const oModel   = this.getView().getModel("hr");
      const aCurrent = oModel.getProperty("/employees");
      let   changed  = 0;
      aCurrent.forEach((emp, i) => {
        if (JSON.stringify(emp) !== JSON.stringify(this._savedEmployees[i])) changed++;
      });
      this._savedEmployees = deepCopy(aCurrent);
      aCurrent.forEach((emp) => {
        const idx = this._allEmployees.findIndex((e) => e.empId === emp.empId);
        if (idx !== -1) this._allEmployees[idx] = Object.assign({}, emp);
      });
      oModel.setProperty("/dirty",       false);
      oModel.setProperty("/showSummary", true);
      oModel.setProperty("/summaryText", `${changed} employee record(s) updated and saved.`);
      this.toast("Changes saved.");
    },

    onDiscard() {
      this._applyFilters(deepCopy(this._savedEmployees));
      const oModel = this.getView().getModel("hr");
      oModel.setProperty("/dirty",       false);
      oModel.setProperty("/showSummary", false);
      this.toast("Changes discarded.");
    },

    onReload() {
      this._allEmployees   = generateEmployees();
      this._savedEmployees = deepCopy(this._allEmployees);
      this._activeFilters  = { dept: "", status: "all", search: "" };
      const oModel = this.getView().getModel("hr");
      oModel.setProperty("/employees",     deepCopy(this._allEmployees));
      oModel.setProperty("/filteredCount", this._allEmployees.length);
      oModel.setProperty("/dirty",         false);
      oModel.setProperty("/showSummary",   false);
      this.byId("deptFilterSelect").setSelectedKey("");
      this.byId("statusFilterBtn").setSelectedKey("all");
      this.byId("hrSearch").setValue("");
      this.toast("Data reloaded.");
    },

    onDeptFilter(oEvent) {
      this._activeFilters.dept = oEvent.getParameter("selectedItem").getKey();
      this._runFilters();
    },

    onStatusFilter(oEvent) {
      this._activeFilters.status = oEvent.getParameter("item").getKey();
      this._runFilters();
    },

    onSearch(oEvent) {
      this._activeFilters.search = oEvent.getParameter("query") || "";
      this._runFilters();
    },

    onSearchLive(oEvent) {
      this._activeFilters.search = oEvent.getParameter("newValue") || "";
      this._runFilters();
    },

    _runFilters() {
      const { dept, status, search } = this._activeFilters;
      const sQ = search.toLowerCase();
      const aFiltered = this._allEmployees.filter((emp) => {
        if (dept && emp.department !== dept)                          return false;
        if (status === "active"   && !emp.active)                    return false;
        if (status === "inactive" &&  emp.active)                    return false;
        if (sQ && !emp.empId.toLowerCase().includes(sQ)
               && !emp.fullName.toLowerCase().includes(sQ))          return false;
        return true;
      });
      this._applyFilters(aFiltered);
    },

    _applyFilters(aData) {
      const oModel = this.getView().getModel("hr");
      oModel.setProperty("/employees",     aData);
      oModel.setProperty("/filteredCount", aData.length);
    },

    onRowSelect() { /* row selection — recorded action target */ },

    // ── Value Help dialog ─────────────────────────────────────────────────────

    onValueHelpOpen(oEvent) {
      const oSource = oEvent.getSource();
      const sField  = oSource.getCustomData()[0].getValue();
      const oCtx    = oSource.getBindingContext("hr");
      if (!oCtx) return;

      this._vhContext = { ctx: oCtx, field: sField };

      const cfg          = VH_CONFIG[sField];
      const currentVal   = oCtx.getObject()[sField];
      const aCurrentKeys = cfg.isArray
        ? (Array.isArray(currentVal) ? currentVal : [])
        : (currentVal ? [currentVal] : []);

      this._openVHDialog(cfg, aCurrentKeys);
    },

    // Triggered by Input showValueHelp (F4 icon click)
    onCostCenterVH(oEvent) {
      const oInput = oEvent.getSource();
      const oCtx   = oInput.getBindingContext("hr");
      if (!oCtx) return;

      this._vhContext = { ctx: oCtx, field: "costCenter" };
      const sCurrentVal = oCtx.getObject().costCenter;
      this._openVHDialog(VH_CONFIG.costCenter, sCurrentVal ? [sCurrentVal] : []);
    },

    _openVHDialog(oCfg, aCurrentKeys) {
      this._vhSelectedKeys = new Set(aCurrentKeys);

      // Per-column filter state — one entry per filterable column
      const oFilterState = {};
      oCfg.columns.forEach((col) => { if (col.filter) oFilterState[col.field] = ""; });

      // Builds filtered+annotated item list using per-column AND-logic
      const buildItems = () =>
        oCfg.items
          .filter((item) =>
            oCfg.columns.every((col) => {
              if (!col.filter) return true;
              const fVal = (oFilterState[col.field] || "").toLowerCase();
              if (!fVal) return true;
              return (item[col.field] || "").toLowerCase().includes(fVal);
            })
          )
          .map((item) => Object.assign({}, item, { _selected: this._vhSelectedKeys.has(item.key) }));

      const oVHModel = new JSONModel({ items: buildItems() });

      // ── Counter badge ─────────────────────────────────────────────
      const oCounter = new ObjectStatus({ text: this._counterText(oCfg), state: "Information" });

      // ── Per-column filter bar ─────────────────────────────────────
      const oFilterRefs = {};
      const aFilterBoxes = [];

      oCfg.columns.forEach((col) => {
        if (!col.filter) return;

        let oCtrl;
        if (col.filter === "input") {
          oCtrl = new MInput({
            placeholder: col.label,
            width:       "9rem",
            liveChange:  (oEv) => {
              oFilterState[col.field] = oEv.getParameter("newValue") || "";
              oVHModel.setProperty("/items", buildItems());
            }
          });
        } else if (col.filter === "select") {
          const aItems = [new CoreItem({ key: "", text: `All` })];
          (col.options || []).forEach((opt) => aItems.push(new CoreItem({ key: opt, text: opt })));
          oCtrl = new Select({
            width: "9rem",
            items: aItems,
            change: (oEv) => {
              oFilterState[col.field] = oEv.getParameter("selectedItem").getKey();
              oVHModel.setProperty("/items", buildItems());
            }
          });
        }

        if (oCtrl) {
          oFilterRefs[col.field] = oCtrl;
          aFilterBoxes.push(
            new VBox({ class: "sapUiSmallMarginEnd sapUiTinyMarginBottom", items: [
              new Label({ text: col.label }),
              oCtrl
            ]})
          );
        }
      });

      const oClearBtn = new Button({
        text:  "Clear Filters",
        type:  "Transparent",
        press: () => {
          oCfg.columns.forEach((col) => {
            if (!col.filter) return;
            oFilterState[col.field] = "";
            const oCtrl = oFilterRefs[col.field];
            if (oCtrl.setValue)       oCtrl.setValue("");
            else if (oCtrl.setSelectedKey) oCtrl.setSelectedKey("");
          });
          oVHModel.setProperty("/items", buildItems());
        }
      });

      const oFilterBar = new FlexBox({
        alignItems: "End",
        wrap:       "Wrap",
        class:      "sapUiSmallMargin",
        items:      aFilterBoxes.concat([oClearBtn])
      });

      // ── Results table ─────────────────────────────────────────────
      const aCols  = oCfg.columns.map((col) =>
        new Column({ header: new Label({ text: col.label }), width: col.width })
      );
      const aCells = oCfg.columns.map((col) =>
        new Text({ text: `{vh>${col.field}}` })
      );

      const oTable = new MTable({
        mode:                   oCfg.multiSelect ? "MultiSelect" : "SingleSelectLeft",
        includeItemInSelection: true,
        sticky:                 ["ColumnHeaders"],
        columns:                aCols,
        items: {
          path:     "vh>/items",
          template: new ColumnListItem({ selected: "{vh>_selected}", cells: aCells })
        },
        selectionChange: (oEvent) => {
          const oItem     = oEvent.getParameter("listItem");
          const bSelected = oEvent.getParameter("selected");
          const sKey      = oItem.getBindingContext("vh").getProperty("key");

          if (!oCfg.multiSelect) this._vhSelectedKeys.clear();
          if (bSelected) this._vhSelectedKeys.add(sKey);
          else           this._vhSelectedKeys.delete(sKey);

          const aItems = oVHModel.getProperty("/items");
          aItems.forEach((item) => { item._selected = this._vhSelectedKeys.has(item.key); });
          oVHModel.setProperty("/items", aItems);
          oCounter.setText(this._counterText(oCfg));
        }
      });
      oTable.setModel(oVHModel, "vh");

      // ── Dialog ────────────────────────────────────────────────────
      const oDialog = new Dialog({
        title:         oCfg.title,
        contentWidth:  "700px",
        contentHeight: "580px",
        subHeader:     new Bar({ contentRight: [oCounter] }),
        content:       [oFilterBar, oTable],
        beginButton: new Button({
          text:  "Confirm",
          type:  "Emphasized",
          press: () => {
            const { ctx, field } = this._vhContext;
            const oModel = this.getView().getModel("hr");
            const newVal = oCfg.isArray
              ? Array.from(this._vhSelectedKeys)
              : (Array.from(this._vhSelectedKeys)[0] || ctx.getObject()[field]);
            oModel.setProperty(`${ctx.getPath()}/${field}`, newVal);
            this.onFieldChange();
            oDialog.close();
          }
        }),
        endButton: new Button({
          text:  "Cancel",
          press: () => oDialog.close()
        }),
        afterClose: () => {
          oDialog.destroy();
          this._vhSelectedKeys = null;
          this._vhContext      = null;
        }
      });

      this.getView().addDependent(oDialog);
      oDialog.open();
    },

    _counterText(oCfg) {
      const n = this._vhSelectedKeys ? this._vhSelectedKeys.size : 0;
      return oCfg.multiSelect ? `${n} selected` : (n ? "1 selected" : "None selected");
    },

    // ── Formatters ─────────────────────────────────────────────────────────────

    formatArrayLabel(aValues) {
      if (!Array.isArray(aValues) || aValues.length === 0) return "—";
      return aValues.join(", ");
    },

    formatManagerLabel(sKey) {
      return MANAGER_LABEL[sKey] || sKey || "—";
    }

  });
});
