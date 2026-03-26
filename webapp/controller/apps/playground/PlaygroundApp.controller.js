sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast"
], (BaseController, JSONModel, MessageToast) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.playground.PlaygroundApp", {

    onInit() {
      const categories = [
        {
          index: 0, name: "Form Controls", description: "Input, Select, Date, Time",
          footer: "142 scenarios", count: 142,
          components: [
            { key: "input",           name: "Input",            description: "Text input with value states and suggestions", icon: "sap-icon://text-align-left",        tag: "sap.m",          tagState: "None" },
            { key: "combobox",        name: "ComboBox",         description: "Dropdown with type-ahead filtering",           icon: "sap-icon://drop-down-list",         tag: "sap.m",          tagState: "None" },
            { key: "multicombobox",   name: "MultiComboBox",    description: "Multi-select dropdown",                        icon: "sap-icon://multi-select",           tag: "sap.m",          tagState: "None" },
            { key: "datepicker",      name: "DatePicker",       description: "Calendar-based date selection",                icon: "sap-icon://appointment-2",          tag: "sap.m",          tagState: "None" },
            { key: "timepicker",      name: "TimePicker",       description: "Clock-based time selection",                   icon: "sap-icon://time-entry-request",     tag: "sap.m",          tagState: "None" },
            { key: "stepinput",       name: "StepInput",        description: "Numeric input with increment/decrement",       icon: "sap-icon://numbered-text",          tag: "sap.m",          tagState: "None" },
            { key: "textarea",        name: "TextArea",         description: "Multi-line text input with auto-grow",         icon: "sap-icon://text",                   tag: "sap.m",          tagState: "None" },
            { key: "checkbox",        name: "CheckBox",         description: "Binary selection control",                    icon: "sap-icon://accept",                 tag: "sap.m",          tagState: "None" },
            { key: "radiobutton",     name: "RadioButtonGroup", description: "Group of mutually exclusive options",          icon: "sap-icon://circle-task",            tag: "sap.m",          tagState: "None" },
            { key: "switch",          name: "Switch",           description: "On/off toggle control",                       icon: "sap-icon://switch-classes",         tag: "sap.m",          tagState: "None" }
          ]
        },
        {
          index: 1, name: "Buttons & Actions", description: "Button types, menus, toolbars",
          footer: "68 scenarios", count: 68,
          components: [
            { key: "button",          name: "Button",           description: "All button types: Default, Emphasized, Accept, Reject", icon: "sap-icon://touch",     tag: "sap.m",          tagState: "None" },
            { key: "togglebutton",    name: "ToggleButton",     description: "Button that stays pressed",                 icon: "sap-icon://activate",               tag: "sap.m",          tagState: "None" },
            { key: "segmentedbutton", name: "SegmentedButton",  description: "Group of buttons as tab-like selection",    icon: "sap-icon://menu2",                  tag: "sap.m",          tagState: "None" },
            { key: "overflowbar",     name: "OverflowToolbar",  description: "Toolbar that collapses overflow to menu",   icon: "sap-icon://overflow",               tag: "sap.m",          tagState: "None" },
            { key: "menubtn",         name: "MenuButton",       description: "Button with dropdown menu",                 icon: "sap-icon://drop-down-list",         tag: "sap.m",          tagState: "None" }
          ]
        },
        {
          index: 2, name: "Lists & Tables", description: "List, Table, Tree variants",
          footer: "95 scenarios", count: 95,
          components: [
            { key: "list",            name: "List",             description: "Standard, object, and custom list items",   icon: "sap-icon://list",                   tag: "sap.m",          tagState: "None" },
            { key: "table",           name: "Table",            description: "Responsive table with grouping and sorting",icon: "sap-icon://table-view",             tag: "sap.m",          tagState: "None" },
            { key: "uitabledata",     name: "UI Table",         description: "High-performance grid table",               icon: "sap-icon://grid",                   tag: "sap.ui.table",   tagState: "None" },
            { key: "tree",            name: "Tree",             description: "Hierarchical data display",                 icon: "sap-icon://tree",                   tag: "sap.m",          tagState: "None" },
            { key: "uploadcollection",name: "UploadCollection", description: "File upload list with preview",             icon: "sap-icon://attachment",             tag: "sap.m",          tagState: "None" }
          ]
        },
        {
          index: 3, name: "Navigation", description: "IconTabBar, Breadcrumb, NavContainer",
          footer: "54 scenarios", count: 54,
          components: [
            { key: "icontabbar",      name: "IconTabBar",       description: "Tab navigation with icons and badges",      icon: "sap-icon://tab-strip",              tag: "sap.m",          tagState: "None" },
            { key: "breadcrumb",      name: "Breadcrumb",       description: "Path-based navigation trail",               icon: "sap-icon://navigation-right-arrow", tag: "sap.m",          tagState: "None" },
            { key: "shellbar",        name: "ShellBar",         description: "Top-level application header",              icon: "sap-icon://menu",                   tag: "sap.f",          tagState: "None" },
            { key: "sidenavigation",  name: "SideNavigation",   description: "Collapsible side panel navigation",         icon: "sap-icon://navigation-left-arrow",  tag: "sap.tnt",        tagState: "None" }
          ]
        },
        {
          index: 4, name: "Feedback & Alerts", description: "MessageBox, Toast, MessageStrip",
          footer: "41 scenarios", count: 41,
          components: [
            { key: "messagebox",      name: "MessageBox",       description: "Modal dialogs for confirm, alert, error",   icon: "sap-icon://message-popup",          tag: "sap.m",          tagState: "None" },
            { key: "messagetoast",    name: "MessageToast",     description: "Non-blocking notification at bottom",       icon: "sap-icon://notification-2",         tag: "sap.m",          tagState: "None" },
            { key: "messagestrip",    name: "MessageStrip",     description: "Inline status messages with close button",  icon: "sap-icon://alert",                  tag: "sap.m",          tagState: "None" },
            { key: "busydialog",      name: "BusyDialog",       description: "Loading overlay with message",              icon: "sap-icon://sys-enter-2",            tag: "sap.m",          tagState: "None" }
          ]
        },
        {
          index: 5, name: "Layout", description: "FlexBox, Grid, SplitApp",
          footer: "77 scenarios", count: 77,
          components: [
            { key: "flexbox",         name: "FlexBox",          description: "CSS Flexbox-based layout container",        icon: "sap-icon://horizontal-grip",        tag: "sap.m",          tagState: "None" },
            { key: "grid",            name: "Grid",             description: "12-column responsive grid layout",          icon: "sap-icon://grid",                   tag: "sap.ui.layout",  tagState: "None" },
            { key: "panel",           name: "Panel",            description: "Collapsible content container",             icon: "sap-icon://border",                 tag: "sap.m",          tagState: "None" },
            { key: "splitapp",        name: "SplitApp",         description: "Master-detail split layout",                icon: "sap-icon://split-screen",           tag: "sap.m",          tagState: "None" },
            { key: "dynamicpage",     name: "DynamicPage",      description: "Page with collapsible header",              icon: "sap-icon://full-screen",            tag: "sap.f",          tagState: "None" }
          ]
        },
        {
          index: 6, name: "Data Visualization", description: "ObjectHeader, Cards, KPIs",
          footer: "63 scenarios", count: 63,
          components: [
            { key: "objectheader",    name: "ObjectHeader",     description: "Entity header with status and attributes",  icon: "sap-icon://product",                tag: "sap.m",          tagState: "None" },
            { key: "generictile",     name: "GenericTile",      description: "Launchpad tile with KPIs",                  icon: "sap-icon://grid",                   tag: "sap.m",          tagState: "None" },
            { key: "numericcontent",  name: "NumericContent",   description: "Large KPI value with indicator arrow",      icon: "sap-icon://customer-financial-fact-sheet", tag: "sap.m",   tagState: "None" },
            { key: "ratingindicator", name: "RatingIndicator",  description: "Star rating display and input",             icon: "sap-icon://favorite",               tag: "sap.m",          tagState: "None" }
          ]
        },
        {
          index: 7, name: "Dialogs & Popovers", description: "Dialog, Popover, Sheet",
          footer: "49 scenarios", count: 49,
          components: [
            { key: "dialog",          name: "Dialog",           description: "Modal window with header and footer",       icon: "sap-icon://popup-window",           tag: "sap.m",          tagState: "None" },
            { key: "popover",         name: "Popover",          description: "Contextual floating panel",                 icon: "sap-icon://hint",                   tag: "sap.m",          tagState: "None" },
            { key: "actionsheet",     name: "ActionSheet",      description: "Bottom sheet with actions (mobile)",        icon: "sap-icon://action",                 tag: "sap.m",          tagState: "None" },
            { key: "responsivepopover",name:"ResponsivePopover","description": "Popover on desktop, dialog on mobile",   icon: "sap-icon://popup-window",           tag: "sap.m",          tagState: "None" }
          ]
        },
        {
          index: 8, name: "Object Display", description: "Avatar, Badge, ObjectStatus",
          footer: "38 scenarios", count: 38,
          components: [
            { key: "avatar",          name: "Avatar",           description: "Initials, icon, or image display",          icon: "sap-icon://person-placeholder",     tag: "sap.m",          tagState: "None" },
            { key: "objectstatus",    name: "ObjectStatus",     description: "State-colored text with optional icon",     icon: "sap-icon://status-in-process",      tag: "sap.m",          tagState: "None" },
            { key: "badge",           name: "Badge",            description: "Small count indicator on controls",         icon: "sap-icon://badge",                  tag: "sap.m",          tagState: "None" }
          ]
        },
        {
          index: 9, name: "Sliders & Range", description: "Slider, RangeSlider",
          footer: "22 scenarios", count: 22,
          components: [
            { key: "slider",          name: "Slider",           description: "Single value range selector",               icon: "sap-icon://horizontal-grip",        tag: "sap.m",          tagState: "None" },
            { key: "rangeslider",     name: "RangeSlider",      description: "Two-handle range selector",                 icon: "sap-icon://horizontal-grip",        tag: "sap.m",          tagState: "None" }
          ]
        },
        {
          index: 10, name: "Upload & Files", description: "FileUploader, UploadCollection",
          footer: "31 scenarios", count: 31,
          components: [
            { key: "fileuploader",    name: "FileUploader",     description: "Single file selection and upload",          icon: "sap-icon://upload",                 tag: "sap.ui.unified", tagState: "None" },
            { key: "uploadset",       name: "UploadSet",        description: "Advanced multi-file upload with preview",   icon: "sap-icon://attachment",             tag: "sap.m",          tagState: "None" }
          ]
        },
        {
          index: 11, name: "Tokens & Tags", description: "Token, MultiInput, Tag",
          footer: "29 scenarios", count: 29,
          components: [
            { key: "multiinput",      name: "MultiInput",       description: "Input with removable token chips",          icon: "sap-icon://tag",                    tag: "sap.m",          tagState: "None" },
            { key: "token",           name: "Token",            description: "Inline tag/chip display",                   icon: "sap-icon://tag",                    tag: "sap.m",          tagState: "None" }
          ]
        },
        {
          index: 12, name: "Object Pages", description: "sap.uxap ObjectPage layout",
          footer: "44 scenarios", count: 44,
          components: [
            { key: "objectpage",      name: "ObjectPageLayout", description: "Full-page entity view with sections",       icon: "sap-icon://detail-view",            tag: "sap.uxap",       tagState: "None" },
            { key: "objectpagesect",  name: "ObjectPageSection","description": "Scrollable content section",             icon: "sap-icon://add-document",           tag: "sap.uxap",       tagState: "None" }
          ]
        },
        {
          index: 13, name: "Wizard & Steps", description: "Wizard, WizardStep",
          footer: "17 scenarios", count: 17,
          components: [
            { key: "wizard",          name: "Wizard",           description: "Multi-step guided task flow",               icon: "sap-icon://step",                   tag: "sap.m",          tagState: "None" }
          ]
        },
        {
          index: 14, name: "Cards (sap.f)", description: "AnalyticalCard, ListCard",
          footer: "33 scenarios", count: 33,
          components: [
            { key: "card",            name: "Card",             description: "Self-contained content container",          icon: "sap-icon://card",                   tag: "sap.f",          tagState: "None" }
          ]
        },
        {
          index: 15, name: "Charts", description: "VizFrame (SAP Charts)",
          footer: "60 scenarios", count: 60,
          components: [
            { key: "bar",             name: "Bar Chart",        description: "Vertical and horizontal bar charts",        icon: "sap-icon://bar-chart",              tag: "sap.viz",        tagState: "None" },
            { key: "line",            name: "Line Chart",       description: "Time-series line chart",                    icon: "sap-icon://line-chart",             tag: "sap.viz",        tagState: "None" },
            { key: "pie",             name: "Pie Chart",        description: "Proportional pie and donut charts",         icon: "sap-icon://pie-chart",              tag: "sap.viz",        tagState: "None" },
            { key: "bullet",          name: "Bullet Chart",     description: "Actual vs. target comparison",              icon: "sap-icon://bar-chart",              tag: "sap.viz",        tagState: "None" }
          ]
        }
      ];

      const allComponents = categories.flatMap(c =>
        c.components.map(comp => Object.assign({ category: c.name }, comp))
      );

      this.getView().setModel(new JSONModel({
        categories,
        allComponents,
        selectedCategory: categories[0],
        selectedComponent: categories[0].components[0],
        favorites: [],
        demo: {
          inputValue: "",
          passwordValue: "",
          stepValue: 25,
          comboKey: "sap_horizon",
          dateValue: "2025-04-01",
          timeValue: "09:00",
          sliderValue: 60,
          ratingValue: 4,
          switchState: true,
          check1: true,
          check2: false,
          check3: true,
          radioIndex: 1,
          multiKeys: ["sap_horizon", "sap_fiori_3"],
          textArea: "",
          comboItems: [
            { key: "sap_horizon",     text: "SAP Horizon"    },
            { key: "sap_fiori_3",     text: "SAP Fiori 3"    },
            { key: "sap_bluecrystal", text: "Blue Crystal"   },
            { key: "sap_belize",      text: "Belize"         },
            { key: "high_contrast",   text: "High Contrast"  }
          ]
        }
      }), "playground");
    },

    onCategoryPress(event) {
      const index = parseInt(event.getSource().data("categoryIndex"), 10);
      const model = this.getView().getModel("playground");
      model.setProperty("/selectedCategory", model.getProperty("/categories/" + index));
      this.byId("playgroundNav").to(this.byId("categoryPage"));
    },

    onComponentPress(event) {
      const key = event.getSource().data("componentKey");
      const model = this.getView().getModel("playground");
      const found = model.getProperty("/allComponents").find(c => c.key === key);
      if (found) {
        model.setProperty("/selectedComponent", found);
        this.byId("playgroundNav").to(this.byId("componentDetail"));
      }
    },

    onFavoritePress(event) {
      const component = event.getSource().getBindingContext("playground").getObject();
      const model = this.getView().getModel("playground");
      const found = model.getProperty("/allComponents").find(c => c.key === component.key);
      if (found) {
        model.setProperty("/selectedComponent", found);
        this.byId("playgroundNav").to(this.byId("componentDetail"));
      }
    },

    onAddFavorite() {
      const model = this.getView().getModel("playground");
      const component = model.getProperty("/selectedComponent");
      const favorites = model.getProperty("/favorites");
      if (favorites.some(f => f.key === component.key)) {
        MessageToast.show("Already in favorites");
        return;
      }
      favorites.push(component);
      model.setProperty("/favorites", favorites);
      MessageToast.show(component.name + " added to favorites");
    },

    onDeleteFavorite(event) {
      const model = this.getView().getModel("playground");
      const key = event.getParameter("listItem").getBindingContext("playground").getObject().key;
      model.setProperty("/favorites", model.getProperty("/favorites").filter(f => f.key !== key));
    },

    onSearchComponents(event) {
      const query = (event.getParameter("query") || event.getParameter("newValue") || "").toLowerCase().trim();
      const model = this.getView().getModel("playground");

      if (!query) {
        this.byId("playgroundNav").to(this.byId("playgroundHome"));
        return;
      }

      const matched = model.getProperty("/allComponents").filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.tag.toLowerCase().includes(query)
      );

      model.setProperty("/selectedCategory", { name: 'Results for "' + query + '"', components: matched });
      this.byId("playgroundNav").to(this.byId("categoryPage"));
    },

    onNavToFavorites() {
      this.byId("playgroundNav").to(this.byId("favoritesPage"));
    },

    onNavToHome() {
      this.byId("playgroundNav").to(this.byId("playgroundHome"));
    },

    onNavToCategory() {
      this.byId("playgroundNav").back();
    },

    onNavBack() {
      this.getOwnerComponent().getRouter().navTo("launchpad");
    }

  });
});
