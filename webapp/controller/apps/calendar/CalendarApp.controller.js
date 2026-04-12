sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/Dialog",
  "sap/m/Button",
  "sap/m/Label",
  "sap/m/Input",
  "sap/m/Select",
  "sap/m/DateTimePicker",
  "sap/m/MessageBox",
  "sap/ui/core/Item",
  "sap/ui/layout/form/SimpleForm"
], (BaseController, JSONModel, Dialog, Button, Label, Input, Select,
    DateTimePicker, MessageBox, Item, SimpleForm) => {
  "use strict";

  // ── Initial appointment data ────────────────────────────────────────────────

  const d = (y, m, day, h = 0, min = 0) => new Date(y, m - 1, day, h, min);
  const now = new Date();
  const Y = now.getFullYear();
  const M = now.getMonth() + 1;

  const TYPE_OPTIONS = [
    { key: "Type01", text: "Meeting"      },
    { key: "Type02", text: "Out of Office"},
    { key: "Type06", text: "Training"     },
    { key: "Type07", text: "Review"       },
    { key: "Type08", text: "Workshop"     },
    { key: "Type09", text: "On-Site Visit"},
    { key: "Type10", text: "Sprint Ceremony"}
  ];

  function buildInitialRows() {
    return [
      {
        id:   "ROW-MG",
        name: "Maria Garcia",
        role: "Engineering Lead",
        icon: "sap-icon://employee",
        appointments: [
          { key: "A001", start: d(Y, M, 7,  9,  0), end: d(Y, M, 7, 10,  0), title: "Sprint Planning",    text: "Q2 Sprint 5",        type: "Type01", tentative: false },
          { key: "A002", start: d(Y, M, 9,  14, 0), end: d(Y, M, 9, 15,  0), title: "1:1 with Klaus",     text: "Weekly sync",        type: "Type07", tentative: false },
          { key: "A003", start: d(Y, M, 12, 9,  0), end: d(Y, M, 14, 17, 0), title: "UI5 Workshop",       text: "Dev training days",  type: "Type06", tentative: false },
          { key: "A004", start: d(Y, M, 18, 10, 0), end: d(Y, M, 18, 11, 0), title: "Sprint Review",      text: "Sprint 5 demo",      type: "Type10", tentative: false },
          { key: "A005", start: d(Y, M, 22, 8,  0), end: d(Y, M, 22, 18, 0), title: "Client Visit",       text: "SAP partner day",    type: "Type09", tentative: true  }
        ],
        headers: [
          { start: d(Y, M, 12, 0, 0), end: d(Y, M, 14, 23, 59), title: "Workshop Week", type: "Type06" }
        ]
      },
      {
        id:   "ROW-KW",
        name: "Klaus Weber",
        role: "Backend Developer",
        icon: "sap-icon://employee",
        appointments: [
          { key: "A006", start: d(Y, M, 7,  9,  0), end: d(Y, M, 7, 10,  0), title: "Sprint Planning",    text: "Q2 Sprint 5",        type: "Type01", tentative: false },
          { key: "A007", start: d(Y, M, 10, 13, 0), end: d(Y, M, 10, 14, 0), title: "Architecture Review",text: "API design session",  type: "Type07", tentative: false },
          { key: "A008", start: d(Y, M, 15, 9,  0), end: d(Y, M, 15, 17, 0), title: "OOO — Vacation",     text: "Personal time off",  type: "Type02", tentative: false },
          { key: "A009", start: d(Y, M, 16, 9,  0), end: d(Y, M, 16, 17, 0), title: "OOO — Vacation",     text: "Personal time off",  type: "Type02", tentative: false },
          { key: "A010", start: d(Y, M, 18, 10, 0), end: d(Y, M, 18, 11, 0), title: "Sprint Review",      text: "Sprint 5 demo",      type: "Type10", tentative: false }
        ],
        headers: []
      },
      {
        id:   "ROW-PM",
        name: "Peter Mueller",
        role: "UI5 Developer",
        icon: "sap-icon://employee",
        appointments: [
          { key: "A011", start: d(Y, M, 7,  9,  0), end: d(Y, M, 7, 10,  0), title: "Sprint Planning",    text: "Q2 Sprint 5",        type: "Type01", tentative: false },
          { key: "A012", start: d(Y, M, 8,  11, 0), end: d(Y, M, 8, 12,  0), title: "Code Review",        text: "PR #142 review",     type: "Type07", tentative: false },
          { key: "A013", start: d(Y, M, 12, 9,  0), end: d(Y, M, 14, 17, 0), title: "UI5 Workshop",       text: "Dev training days",  type: "Type06", tentative: false },
          { key: "A014", start: d(Y, M, 20, 14, 0), end: d(Y, M, 20, 16, 0), title: "Demo Prep",          text: "Client demo run",    type: "Type08", tentative: true  },
          { key: "A015", start: d(Y, M, 25, 10, 0), end: d(Y, M, 25, 11, 0), title: "Retro",              text: "Sprint 5 retrospective", type: "Type10", tentative: false }
        ],
        headers: [
          { start: d(Y, M, 12, 0, 0), end: d(Y, M, 14, 23, 59), title: "Workshop Week", type: "Type06" }
        ]
      }
    ];
  }

  let _apptCounter = 100;
  const nextApptKey = () => `A${String(++_apptCounter).padStart(3, "0")}`;

  // ── Controller ──────────────────────────────────────────────────────────────

  return BaseController.extend("ui5.fira.demos.controller.apps.calendar.CalendarApp", {

    onInit() {
      this.getView().setModel(new JSONModel({
        rows:      buildInitialRows(),
        startDate: new Date(Y, M - 1, 1),
        viewKey:   "Day",
        eventLog:  []
      }), "cal");
    },

    // ── Toolbar actions ──────────────────────────────────────────────────────

    onViewChange(oEvent) {
      const sKey = oEvent.getParameter("selectedItem").getKey();
      this.getView().getModel("cal").setProperty("/viewKey", sKey);
    },

    onToday() {
      this.getView().getModel("cal").setProperty("/startDate", new Date());
    },

    // ── Add appointment (from header button — opens picker for row + time) ───

    onAddAppointment() {
      this._openApptDialog(null, null, null);
    },

    // ── Interval select (click on empty slot) ────────────────────────────────

    onIntervalSelect(oEvent) {
      const oStartDate = oEvent.getParameter("startDate");
      const oEndDate   = oEvent.getParameter("endDate");
      const oRow       = oEvent.getParameter("row");
      this._openApptDialog(oRow, oStartDate, oEndDate);
    },

    // ── Appointment select (click existing) ──────────────────────────────────

    onAppointmentSelect(oEvent) {
      const oAppt = oEvent.getParameter("appointment");
      if (!oAppt) return;

      const sTitle = oAppt.getTitle();
      const oCtx   = oAppt.getBindingContext("cal");

      MessageBox.show(`"${sTitle}"`, {
        title:   "Appointment Options",
        icon:    MessageBox.Icon.NONE,
        actions: ["Edit", "Delete", MessageBox.Action.CANCEL],
        onClose: (sAction) => {
          if (sAction === "Delete") {
            this._deleteAppointment(oCtx);
          } else if (sAction === "Edit") {
            this._openApptDialog(null, null, null, oCtx);
          }
        }
      });
    },

    // ── Appointment drag & drop ───────────────────────────────────────────────

    onAppointmentDrop(oEvent) {
      const oAppt        = oEvent.getParameter("appointment");
      const oNewStart    = oEvent.getParameter("startDate");
      const oNewEnd      = oEvent.getParameter("endDate");
      const oTargetRow   = oEvent.getParameter("calendarRow");
      const bCopy        = oEvent.getParameter("copy");

      const oCtx    = oAppt.getBindingContext("cal");
      const sPath   = oCtx.getPath(); // e.g. /rows/0/appointments/2
      const oModel  = this.getView().getModel("cal");
      const oApptData = oCtx.getObject();

      if (!bCopy) {
        // Move: remove from source row, add to target row
        const sSourceRowPath = sPath.replace(/\/appointments\/\d+$/, "");
        const aSourceAppts   = oModel.getProperty(`${sSourceRowPath}/appointments`);
        const iIdx           = aSourceAppts.findIndex((a) => a.key === oApptData.key);
        if (iIdx !== -1) aSourceAppts.splice(iIdx, 1);
        oModel.setProperty(`${sSourceRowPath}/appointments`, aSourceAppts);
      }

      // Find target row index
      const sTargetRowId  = oTargetRow.getKey();
      const aRows         = oModel.getProperty("/rows");
      const iTargetRowIdx = aRows.findIndex((r) => r.id === sTargetRowId);
      if (iTargetRowIdx === -1) return;

      const oNewAppt = Object.assign({}, oApptData, {
        key:   bCopy ? nextApptKey() : oApptData.key,
        start: oNewStart,
        end:   oNewEnd
      });

      const aTargetAppts = oModel.getProperty(`/rows/${iTargetRowIdx}/appointments`);
      aTargetAppts.push(oNewAppt);
      oModel.setProperty(`/rows/${iTargetRowIdx}/appointments`, aTargetAppts);
      oModel.refresh(true);

      this._logEvent(`"${oApptData.title}" ${bCopy ? "copied" : "moved"} to ${oTargetRow.getTitle()}`);
    },

    // ── Appointment dialog (create + edit) ───────────────────────────────────

    _openApptDialog(oRow, oStartDate, oEndDate, oEditCtx) {
      const oModel    = this.getView().getModel("cal");
      const aRows     = oModel.getProperty("/rows");
      const isEdit    = !!oEditCtx;
      const oEditData = isEdit ? oEditCtx.getObject() : null;

      // ── Form controls ────────────────────────────────────────────
      const fmt = (d) => d ? this._formatDT(d) : "";

      const oTitleInput = new Input("apptTitleInput", {
        placeholder: "Appointment title",
        value:       isEdit ? oEditData.title : ""
      });

      const oTextInput = new Input("apptTextInput", {
        placeholder: "Description (optional)",
        value:       isEdit ? (oEditData.text || "") : ""
      });

      const oTypeSelect = new Select("apptTypeSelect", {
        items: TYPE_OPTIONS.map((t) => new Item({ key: t.key, text: t.text }))
      });
      if (isEdit) oTypeSelect.setSelectedKey(oEditData.type);
      else        oTypeSelect.setSelectedKey("Type01");

      const oRowSelect = new Select("apptRowSelect", {
        items: aRows.map((r) => new Item({ key: r.id, text: r.name }))
      });
      if (oRow) oRowSelect.setSelectedKey(oRow.getKey());

      const oStartPicker = new DateTimePicker("apptStartDTP", {
        valueFormat:   "yyyy-MM-ddTHH:mm:ss",
        displayFormat: "dd.MM.yyyy HH:mm",
        value: isEdit ? this._formatDT(oEditData.start) : fmt(oStartDate)
      });

      const oEndPicker = new DateTimePicker("apptEndDTP", {
        valueFormat:   "yyyy-MM-ddTHH:mm:ss",
        displayFormat: "dd.MM.yyyy HH:mm",
        value: isEdit ? this._formatDT(oEditData.end) : fmt(oEndDate)
      });

      const oForm = new SimpleForm({
        editable: true,
        layout:   "ResponsiveGridLayout",
        labelSpanM: 4, columnsM: 1,
        content: [
          new Label({ text: "Title",       labelFor: "apptTitleInput"  }), oTitleInput,
          new Label({ text: "Description", labelFor: "apptTextInput"   }), oTextInput,
          new Label({ text: "Type",        labelFor: "apptTypeSelect"  }), oTypeSelect,
          new Label({ text: "Employee",    labelFor: "apptRowSelect"   }), oRowSelect,
          new Label({ text: "Start",       labelFor: "apptStartDTP"    }), oStartPicker,
          new Label({ text: "End",         labelFor: "apptEndDTP"      }), oEndPicker
        ]
      });

      const oDialog = new Dialog("apptDialog", {
        title:         isEdit ? "Edit Appointment" : "New Appointment",
        contentWidth:  "400px",
        content:       [oForm],
        beginButton: new Button("apptSaveBtn", {
          text:  isEdit ? "Update" : "Add",
          type:  "Emphasized",
          press: () => {
            const sTitle = oTitleInput.getValue().trim();
            if (!sTitle) { this.toast("Title is required."); return; }

            const oStart = oStartPicker.getDateValue();
            const oEnd   = oEndPicker.getDateValue();
            if (!oStart || !oEnd)          { this.toast("Start and end date required."); return; }
            if (oEnd <= oStart)            { this.toast("End must be after start."); return; }

            const sRowId    = oRowSelect.getSelectedKey();
            const iRowIndex = aRows.findIndex((r) => r.id === sRowId);
            if (iRowIndex === -1) return;

            if (isEdit) {
              this._updateAppointment(oEditCtx, {
                title: sTitle, text: oTextInput.getValue(),
                type:  oTypeSelect.getSelectedKey(), start: oStart, end: oEnd
              }, sRowId);
            } else {
              const oNewAppt = {
                key:       nextApptKey(),
                title:     sTitle,
                text:      oTextInput.getValue(),
                type:      oTypeSelect.getSelectedKey(),
                start:     oStart,
                end:       oEnd,
                tentative: false
              };
              const aAppts = oModel.getProperty(`/rows/${iRowIndex}/appointments`);
              aAppts.push(oNewAppt);
              oModel.setProperty(`/rows/${iRowIndex}/appointments`, aAppts);
              oModel.refresh(true);
              this._logEvent(`Added: "${sTitle}" for ${aRows[iRowIndex].name}`);
            }

            oDialog.close();
          }
        }),
        endButton: new Button("apptCancelBtn", {
          text:  "Cancel",
          press: () => oDialog.close()
        }),
        afterClose: () => oDialog.destroy()
      });

      this.getView().addDependent(oDialog);
      oDialog.open();
    },

    _updateAppointment(oCtx, oUpdated, sTargetRowId) {
      const oModel    = this.getView().getModel("cal");
      const sPath     = oCtx.getPath();
      const oOldData  = oCtx.getObject();
      const aRows     = oModel.getProperty("/rows");

      // Update in-place (same row)
      const sSrcRowPath = sPath.replace(/\/appointments\/\d+$/, "");
      const sSrcRowId   = oModel.getProperty(`${sSrcRowPath}/id`);

      if (sSrcRowId === sTargetRowId) {
        Object.assign(oModel.getProperty(sPath), oUpdated);
        oModel.refresh(true);
      } else {
        // Move to different row
        const aSrcAppts  = oModel.getProperty(`${sSrcRowPath}/appointments`);
        const iIdx       = aSrcAppts.findIndex((a) => a.key === oOldData.key);
        if (iIdx !== -1) aSrcAppts.splice(iIdx, 1);
        oModel.setProperty(`${sSrcRowPath}/appointments`, aSrcAppts);

        const iTarget = aRows.findIndex((r) => r.id === sTargetRowId);
        const aTgtAppts = oModel.getProperty(`/rows/${iTarget}/appointments`);
        aTgtAppts.push(Object.assign({}, oOldData, oUpdated));
        oModel.setProperty(`/rows/${iTarget}/appointments`, aTgtAppts);
        oModel.refresh(true);
      }
      this._logEvent(`Updated: "${oUpdated.title}"`);
    },

    _deleteAppointment(oCtx) {
      const oModel   = this.getView().getModel("cal");
      const sPath    = oCtx.getPath();
      const oAppt    = oCtx.getObject();
      const sRowPath = sPath.replace(/\/appointments\/\d+$/, "");
      const aAppts   = oModel.getProperty(`${sRowPath}/appointments`);
      const iIdx     = aAppts.findIndex((a) => a.key === oAppt.key);
      if (iIdx !== -1) aAppts.splice(iIdx, 1);
      oModel.setProperty(`${sRowPath}/appointments`, aAppts);
      oModel.refresh(true);
      this._logEvent(`Deleted: "${oAppt.title}"`);
      this.toast(`"${oAppt.title}" deleted.`);
    },

    // ── Utilities ────────────────────────────────────────────────────────────

    _formatDT(oDate) {
      if (!oDate) return "";
      const pad = (n) => String(n).padStart(2, "0");
      const d = new Date(oDate);
      return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
    },

    _logEvent(sText) {
      const oModel = this.getView().getModel("cal");
      const aLog   = oModel.getProperty("/eventLog");
      aLog.unshift({ text: sText, time: new Date().toLocaleTimeString("en-GB") });
      oModel.setProperty("/eventLog", aLog.slice(0, 30));
    }

  });
});
