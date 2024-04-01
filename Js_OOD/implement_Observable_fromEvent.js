/**
  This is a follow-up on implement_Observable.js

  Suppose you have solved 57. create an Observable, here you are asked to implement a creation operator fromEvent()( for DOM Event)

  From the document, fromEvent()
    Creates an Observable that emits events of a specific type coming from the given event target.

  Note:
    Observable is already given for you, no need to create it.
    the event listener removal is handled by add(), which is beyond our scope here, you can ignore that.
 */

/* --------------------- 用例测试 ----------------------- */
//Simply speaking, it is a util to attach event listener in Observable fashion.
const source = fromEvent(node, 'click');
source.subscribe((e) => console.log(e)); //When node is clicked, the event is logged.

/* ---------------------------- Solution -------------------------------- */
/**
 * @param {HTMLElement} element
 * @param {string} eventName
 * @param {boolean} capture
 * @return {Observable}
 */
function fromEvent(element, eventName, capture = false) {
  return new Observable((sub) => {
    element.addEventListener(
      eventName,
      (event) => {
        sub.next(event);
      },
      capture
    );
  });
}
