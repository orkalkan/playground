sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox",
  "sap/ui/unified/DateTypeRange"
], (BaseController, JSONModel, MessageBox, DateTypeRange) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.leave.LeaveApp", {

    onInit() {
      const data = {
        requests: [
          { type: "Annual Leave", typeKey: "annual", dateRange: "24–28 Mar 2025", days: 5, status: "Pending Approval", substitute: "Sub: Julia Mayer", substituteKey: "jmayer" },
          { type: "Remote Work", typeKey: "remote", dateRange: "10–12 Mar 2025", days: 3, status: "Approved", substitute: "", substituteKey: "" },
          { type: "Annual Leave", typeKey: "annual", dateRange: "10–14 Feb 2025", days: 5, status: "Approved", substitute: "Sub: Thomas Schmidt", substituteKey: "tschmidt" },
          { type: "Sick Leave", typeKey: "sick", dateRange: "27 Jan 2025", days: 1, status: "Approved", substitute: "", substituteKey: "" },
          { type: "Compensatory", typeKey: "compensatory", dateRange: "20 Dec 2024", days: 1, status: "Approved", substitute: "", substituteKey: "" },
          { type: "Remote Work", typeKey: "remote", dateRange: "4–6 Nov 2024", days: 3, status: "Approved", substitute: "", substituteKey: "" },
          { type: "Annual Leave", typeKey: "annual", dateRange: "28 Oct – 1 Nov 2024", days: 5, status: "Approved", substitute: "Sub: Anna Wagner", substituteKey: "awagner" },
          { type: "Special Leave", typeKey: "special", dateRange: "15 Sep 2024", days: 1, status: "Approved", substitute: "", substituteKey: "" },
          { type: "Sick Leave", typeKey: "sick", dateRange: "12–13 Aug 2024", days: 2, status: "Approved", substitute: "", substituteKey: "" },
          { type: "Annual Leave", typeKey: "annual", dateRange: "15–26 Jul 2024", days: 10, status: "Approved", substitute: "Sub: Julia Mayer", substituteKey: "jmayer" }
        ],
        pendingApprovals: [
          { employee: "Peter Hansen", type: "Annual Leave", dateRange: "25–29 Mar 2025", days: 5, reason: "Family vacation" },
          { employee: "Lisa Neumann", type: "Sick Leave", dateRange: "24 Mar 2025", days: 1, reason: "Doctor appointment" },
          { employee: "David Krause", type: "Remote Work", dateRange: "31 Mar – 2 Apr 2025", days: 3, reason: "Home office week" },
          { employee: "Sandra Wolf", type: "Compensatory", dateRange: "28 Mar 2025", days: 1, reason: "Overtime compensation" },
          { employee: "Mark Zimmermann", type: "Annual Leave", dateRange: "7–11 Apr 2025", days: 5, reason: "Easter holidays" },
          { employee: "Eva Richter", type: "Remote Work", dateRange: "14–16 Apr 2025", days: 3, reason: "Focus week" },
          { employee: "Klaus Bauer", type: "Annual Leave", dateRange: "21–25 Apr 2025", days: 5, reason: "City break" },
          { employee: "Nina Hoffmann", type: "Maternity / Paternity", dateRange: "1 May – 30 Jul 2025", days: 65, reason: "Parental leave" }
        ],
        editRequest: null
      };
      this.getView().setModel(new JSONModel(data), "leave");
    },

    _setupCalendar() {
      const cal = this.byId("leaveCalendar");
      if (!cal) return;
      cal.removeAllSpecialDates();
      [
        { start: [2025,2,17], end: [2025,2,21], type: "Type01", tooltip: "Annual leave — Julia Mayer" },
        { start: [2025,2,24], end: [2025,2,26], type: "Type02", tooltip: "Sick leave — Thomas Schmidt" },
        { start: [2025,2,10], end: [2025,2,12], type: "Type03", tooltip: "Remote work — Anna Wagner" },
        { start: [2025,2,28], end: [2025,3,1],  type: "Type04", tooltip: "Annual leave — Michael Braun" }
      ].forEach(({ start, end, type, tooltip }) => {
        cal.addSpecialDate(new DateTypeRange({
          startDate: new Date(start[0], start[1], start[2]),
          endDate:   new Date(end[0], end[1], end[2]),
          type,
          tooltip
        }));
      });
    },

    onNavBack() { this.byId("leaveNav").back(); },
    onNavBackToLaunchpad() { this.navBackToLaunchpad(); },

    onNewRequestPress() { this.byId("leaveNav").to(this.byId("leaveRequestPage")); },

    onTeamCalendarPress() {
      this.byId("leaveNav").to(this.byId("leaveCalendarPage"));
      setTimeout(() => this._setupCalendar(), 100);
    },

    onRequestPress() { this.byId("leaveNav").to(this.byId("leaveApprovalPage")); },

    onEditRequestPress(event) {
      event.stopPropagation ? event.stopPropagation() : null;
      const ctx = event.getSource().getBindingContext("leave");
      const model = this.getView().getModel("leave");
      model.setProperty("/editRequest", Object.assign({}, ctx.getObject()));
      this._editRequestPath = ctx.getPath();
      this.byId("leaveNav").to(this.byId("leaveEditPage"));
    },

    onSaveRequest() {
      const model = this.getView().getModel("leave");
      const editRequest = model.getProperty("/editRequest");
      const typeKey = this.byId("editLeaveTypeSelect").getSelectedKey();
      const typeMap = { annual: "Annual Leave", sick: "Sick Leave", remote: "Remote Work", compensatory: "Compensatory", maternity: "Maternity / Paternity", special: "Special Leave" };
      editRequest.typeKey = typeKey;
      editRequest.type = typeMap[typeKey] || typeKey;
      if (this._editRequestPath) {
        model.setProperty(this._editRequestPath + "/type", editRequest.type);
        model.setProperty(this._editRequestPath + "/typeKey", typeKey);
        model.setProperty(this._editRequestPath + "/dateRange", editRequest.dateRange);
        model.setProperty(this._editRequestPath + "/days", editRequest.days);
        model.refresh(true);
      }
      this.toast("Leave request updated");
      this.byId("leaveNav").back();
    },

    onDeleteRequestPress(event) {
      event.stopPropagation ? event.stopPropagation() : null;
      const ctx = event.getSource().getBindingContext("leave");
      const req = ctx.getObject();
      MessageBox.confirm(`Cancel leave request: ${req.type} · ${req.dateRange}?`, {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("leave");
          const requests = model.getProperty("/requests");
          const idx = requests.indexOf(req);
          if (idx !== -1) {
            requests.splice(idx, 1);
            model.setProperty("/requests", requests);
            model.refresh(true);
          }
          this.toast("Leave request cancelled");
        }
      });
    },

    onSubmitRequest() {
      const model = this.getView().getModel("leave");
      const requests = model.getProperty("/requests");
      const typeKey = this.byId("newLeaveTypeSelect").getSelectedKey();
      const typeMap = { annual: "Annual Leave", sick: "Sick Leave", remote: "Remote Work", compensatory: "Compensatory", maternity: "Maternity / Paternity", special: "Special Leave" };
      requests.unshift({
        type: typeMap[typeKey] || "Annual Leave",
        typeKey,
        dateRange: "Pending dates",
        days: 0,
        status: "Pending Approval",
        substitute: "",
        substituteKey: ""
      });
      model.setProperty("/requests", requests);
      model.refresh(true);
      this.toast("Leave request submitted for approval");
      this.byId("leaveNav").back();
    },

    onApproveRequest(event) {
      const item = event.getSource().getParent().getParent();
      item.destroy();
      this.toast("Request approved");
    },

    onRejectRequest(event) {
      const item = event.getSource().getParent().getParent();
      item.destroy();
      this.toast("Request rejected");
    },

    formatLeaveTypeIcon(type) {
      const map = { "Annual Leave": "sap-icon://calendar", "Sick Leave": "sap-icon://stethoscope", "Remote Work": "sap-icon://home", "Compensatory": "sap-icon://time-overtime", "Maternity / Paternity": "sap-icon://family-care", "Special Leave": "sap-icon://activate" };
      return map[type] || "sap-icon://calendar";
    },

    formatLeaveTypeColor(type) {
      const map = { "Annual Leave": "#0070F2", "Sick Leave": "#BB0000", "Remote Work": "#188918", "Compensatory": "#E9730C" };
      return map[type] || "#8c8c8c";
    },

    formatStatusState(status) {
      const map = { "Pending Approval": "Warning", "Approved": "Success", "Rejected": "Error" };
      return map[status] || "None";
    }

  });
});
