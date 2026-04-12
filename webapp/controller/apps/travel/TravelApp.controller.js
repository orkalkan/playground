sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox"
], (BaseController, JSONModel, MessageBox) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.travel.TravelApp", {

    onInit() {
      const data = {
        trips: [
          { id: "TR-2025-0048", purpose: "SAP TechEd 2025", destination: "Barcelona", country: "Spain", countryKey: "ES", departureDate: "2025-03-10", returnDate: "2025-03-14", estimatedCost: 2000, actualCost: 1840, currency: "EUR", costCenter: "CC-1001", status: "Pending Approval", overspend: false },
          { id: "TR-2025-0047", purpose: "Customer Meeting — BMW AG", destination: "Munich", country: "Germany", countryKey: "DE", departureDate: "2025-03-03", returnDate: "2025-03-03", estimatedCost: 400, actualCost: 385, currency: "EUR", costCenter: "CC-1001", status: "Approved", overspend: false },
          { id: "TR-2025-0046", purpose: "Partner Summit DACH", destination: "Vienna", country: "Austria", countryKey: "AT", departureDate: "2025-02-18", returnDate: "2025-02-20", estimatedCost: 1200, actualCost: 1380, currency: "EUR", costCenter: "CC-1001", status: "Approved", overspend: true },
          { id: "TR-2025-0045", purpose: "Trade Fair — Hannover Messe", destination: "Hannover", country: "Germany", countryKey: "DE", departureDate: "2025-04-07", returnDate: "2025-04-11", estimatedCost: 1800, actualCost: 0, currency: "EUR", costCenter: "CC-1001", status: "Open", overspend: false },
          { id: "TR-2025-0044", purpose: "Executive Board Meeting", destination: "Frankfurt", country: "Germany", countryKey: "DE", departureDate: "2025-01-28", returnDate: "2025-01-29", estimatedCost: 600, actualCost: 590, currency: "EUR", costCenter: "CC-1004", status: "Reimbursed", overspend: false },
          { id: "TR-2025-0043", purpose: "Technology Conference — Cloud Summit", destination: "Amsterdam", country: "Netherlands", countryKey: "NL", departureDate: "2025-05-05", returnDate: "2025-05-07", estimatedCost: 1500, actualCost: 0, currency: "EUR", costCenter: "CC-1002", status: "Open", overspend: false },
          { id: "TR-2025-0042", purpose: "Customer Workshop — Siemens AG", destination: "Berlin", country: "Germany", countryKey: "DE", departureDate: "2025-04-22", returnDate: "2025-04-23", estimatedCost: 500, actualCost: 0, currency: "EUR", costCenter: "CC-1001", status: "Open", overspend: false },
          { id: "TR-2025-0041", purpose: "Sales Kickoff 2025", destination: "Hamburg", country: "Germany", countryKey: "DE", departureDate: "2025-01-15", returnDate: "2025-01-16", estimatedCost: 450, actualCost: 420, currency: "EUR", costCenter: "CC-1001", status: "Reimbursed", overspend: false },
          { id: "TR-2025-0040", purpose: "Training — Fiori Development", destination: "Walldorf", country: "Germany", countryKey: "DE", departureDate: "2025-02-10", returnDate: "2025-02-12", estimatedCost: 800, actualCost: 760, currency: "EUR", costCenter: "CC-1002", status: "Reimbursed", overspend: false },
          { id: "TR-2025-0039", purpose: "Global R&D Meeting", destination: "London", country: "United Kingdom", countryKey: "GB", departureDate: "2025-06-03", returnDate: "2025-06-05", estimatedCost: 2200, actualCost: 0, currency: "EUR", costCenter: "CC-1003", status: "Open", overspend: false },
          { id: "TR-2025-0038", purpose: "Annual Supplier Review", destination: "Stuttgart", country: "Germany", countryKey: "DE", departureDate: "2025-03-25", returnDate: "2025-03-25", estimatedCost: 350, actualCost: 295, currency: "EUR", costCenter: "CC-1001", status: "Pending Approval", overspend: false },
          { id: "TR-2025-0037", purpose: "SAPPHIRE NOW 2025", destination: "Orlando", country: "United States", countryKey: "US", departureDate: "2025-06-10", returnDate: "2025-06-14", estimatedCost: 5500, actualCost: 0, currency: "EUR", costCenter: "CC-1004", status: "Open", overspend: false }
        ],
        selectedTrip: null,
        editTrip: null,
        currentExpenses: [],
        newTripX: { purpose: "", destination: "", departureDate: "", returnDate: "" }
      };
      this.getView().setModel(new JSONModel(data), "travel");
    },

    onNavBack() { this.byId("travelNav").back(); },
    onNavBackToLaunchpad() { this.navBackToLaunchpad(); },

    onNewTripPress() {
      this.getView().getModel("travel").setProperty("/newTripX", { purpose: "", destination: "", departureDate: "", returnDate: "" });
      this.byId("travelNav").to(this.byId("travelRequestPage"));
    },

    onTripPress(event) {
      const ctx = event.getSource().getBindingContext("travel");
      const trip = ctx.getObject();
      const model = this.getView().getModel("travel");
      model.setProperty("/selectedTrip", trip);
      model.setProperty("/currentExpenses", [
        { date: trip.departureDate, category: "flight", description: "Flight to " + trip.destination, amount: 480, receipt: "Attached" },
        { date: trip.departureDate, category: "hotel", description: "Hotel — " + trip.destination, amount: 840, receipt: "Attached" },
        { date: trip.departureDate, category: "meals", description: "Meals", amount: 65, receipt: "Attached" }
      ]);
      this.byId("travelNav").to(this.byId("travelExpensePage"));
    },

    onEditTripPress(event) {
      event.stopPropagation ? event.stopPropagation() : null;
      const ctx = event.getSource().getBindingContext("travel");
      const trip = Object.assign({}, ctx.getObject());
      this.getView().getModel("travel").setProperty("/editTrip", trip);
      this._editTripPath = ctx.getPath();
      this.byId("travelNav").to(this.byId("travelEditPage"));
    },

    onDeleteTripPress(event) {
      event.stopPropagation ? event.stopPropagation() : null;
      const ctx = event.getSource().getBindingContext("travel");
      const trip = ctx.getObject();
      MessageBox.confirm(`Delete trip "${trip.purpose}" to ${trip.destination}?`, {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("travel");
          const trips = model.getProperty("/trips");
          const idx = trips.indexOf(trip);
          if (idx !== -1) {
            trips.splice(idx, 1);
            model.setProperty("/trips", trips);
            model.refresh(true);
          }
          this.toast("Trip deleted");
        }
      });
    },

    onSaveTrip() {
      const model = this.getView().getModel("travel");
      const editTrip = model.getProperty("/editTrip");
      if (this._editTripPath) {
        const trips = model.getProperty("/trips");
        const existing = model.getProperty(this._editTripPath);
        Object.assign(existing, editTrip);
        model.setProperty("/trips", trips);
        model.refresh(true);
      }
      this.toast("Trip updated successfully");
      this.byId("travelNav").back();
    },

    onSubmitTripRequest() {
      const model = this.getView().getModel("travel");
      const trips = model.getProperty("/trips");
      const newId = `TR-2025-${String(trips.length + 50).padStart(4, "0")}`;
      // Prefer byId (regular app) — fall back to model values (X variant, ID-free)
      const newTripX = model.getProperty("/newTripX") ?? {};
      const purpose = this.byId("newTripPurpose")?.getValue() || newTripX.purpose || "New Trip";
      const city = this.byId("newTripCity")?.getValue() || newTripX.destination || "Unknown";
      const departureDate = this.byId("newTripDepartureDate")?.getValue() || newTripX.departureDate || "";
      const returnDate = this.byId("newTripReturnDate")?.getValue() || newTripX.returnDate || "";
      trips.unshift({
        id: newId,
        purpose,
        destination: city,
        country: "Germany",
        countryKey: "DE",
        departureDate,
        returnDate,
        estimatedCost: parseFloat(this.byId("newTripEstimatedCost")?.getValue() ?? "0") || 0,
        actualCost: 0,
        currency: "EUR",
        costCenter: "CC-1001",
        status: "Open",
        overspend: false
      });
      model.setProperty("/trips", trips);
      model.refresh(true);
      this.toast(`Trip request ${newId} submitted`);
      this.byId("travelNav").back();
    },

    onAddExpense() {
      const model = this.getView().getModel("travel");
      const items = model.getProperty("/currentExpenses");
      items.push({ date: "", category: "other", description: "", amount: 0, receipt: "Missing" });
      model.setProperty("/currentExpenses", items);
    },

    onSaveDraft() { this.toast("Draft saved"); },

    onSubmitExpenses() {
      this.toast("Expense report submitted for approval");
      this.byId("travelNav").backToPage(this.byId("travelListPage"));
    },

    formatDate(dateStr) {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("de-DE");
    },

    formatOverspend(overspend) {
      return overspend ? "Error" : "None";
    },

    formatReceiptState(receipt) {
      return receipt === "Missing" ? "Error" : "Success";
    },

    formatStatusState(status) {
      const map = { "Open": "None", "Pending Approval": "Warning", "Approved": "Success", "Reimbursed": "None", "Rejected": "Error" };
      return map[status] || "None";
    }

  });
});
