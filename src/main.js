let div = dom.create('<div><h2>标题</h2><p>这是一段文字</p><p>这是第二段文字</p></div>')
let p = dom.create("<p>这是第三段文字</p>")
dom.append(document.body, div)
dom.append(div, p)
console.log()
dom.remove(p);
let wrap = dom.create('<div class="wrap"></div>')
dom.wrap(div, wrap);
// console.log(dom.empty(div))
// dom.empty(div);

console.log(dom.attr(wrap, 'class', "aa"))
console.log(wrap);
fn = function() {
    alert(2);

}
dom.on(wrap, 'click', fn);
dom.off(wrap, 'click', fn);
console.log();
console.log(dom.children(dom.find('.box')[0]))

dom.each(dom.children(dom.find('.box')[0]), function(item) {
    console.log(item);
    dom.style(item, "color", 'red');
})
console.log(dom.index(dom.find('.b')[0]));