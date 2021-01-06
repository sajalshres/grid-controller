const gridController = {
  activeItem: null,

  ui: {
    container: "dashboard",
    item: "widget-item",
    dragStart: "drag-start",
    dragEnter: "drag-enter",
  },

  events: {
    dragstart: "onDragStart",
    dragend: "onDragEnd",
    dragover: "onDragOver",
    dragenter: "onDragEnter",
    dragleave: "onDragLeave",
    drop: "onDrop",
  },

  get container() {
    return document.querySelector(`.${this.ui.container}`);
  },

  get items() {
    return this.container.querySelectorAll(`.${this.ui.item}`);
  },

  removeClasses() {
    this.items.forEach((item) => {
      item.classList.remove(this.ui.dragStart, this.ui.dragEnter);
    });
  },

  onDragStart(element, event) {
    this.activeItem = event.srcElement;
    event.target.classList.add(this.ui.dragStart);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", element.innerHTML);
  },

  onDragEnd(element, event) {
    event.target.classList.remove(this.ui.dragStart);
  },

  onDragEnter(element, event) {
    event.preventDefault();
    console.log({ element: element, event: event.srcElement });
    event.target.classList.add(this.ui.dragEnter);
  },

  onDragLeave(element, event) {
    event.target.classList.remove(this.ui.dragEnter);
  },

  onDragOver(element, event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    return false;
  },

  onDrop(element, event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }

    if (this.activeItem !== event.srcElement) {
      this.activeItem.innerHTML = element.innerHTML;
      element.innerHTML = event.dataTransfer.getData("text/html");
    }
    this.removeClasses();

    return false;
  },

  init({ container, item }) {
    this.ui.container = container;
    this.ui.item = item;

    for (let [evenType, handler] of Object.entries(this.events)) {
      this.items.forEach((item) => {
        item.addEventListener(evenType, (event) => {
          this[handler](item, event);
        });
      });
    }
  },
};

export default gridController;

export { gridController };
