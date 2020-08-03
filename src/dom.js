window.dom = {
    create(string) {
        // 新语法template用于创建一个不需要显示在html页面上的标签 
        let container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after(node, newNode) {
        node.parentNode.insertBefore(newNode, node.nextSibling);
    },
    before(node, newNode) {
        node.parentNode.insertBefore(newNode, node);
    },
    append(parent, node) {
        parent.appendChild(node);
    },
    wrap(node, parent) {
        dom.before(node, parent);
        //由于append操作的是同一个元素所有这里使用append其实是移动node节点到父节点中    
        dom.append(parent, node);
    },
    remove(node) {
        node.parentNode.removeChild(node);
        return node;
    },
    empty(parent) {
        const { childNodes } = parent, childList = [];
        for (let i = 0; i < childNodes.length;) {
            childList.push(dom.remove(childNodes[i]));
        }
        return childList;
    },
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value);
        } else if (arguments.length === 2) {
            return node.getAttribute(name);
        }
    },
    text(node, text) {
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = text;
            } else {
                node.textContent = text;
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    html(node, html) {
        if (arguments.length === 2) {
            node.innerHTML = html;
        } else if (arguments.length === 1) {
            return node.innerHTML;
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.css(div,background,"red");
            node.style[name] = value;
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.css(div,background);
                return node.style[name];
            } else if (name instanceof Object) {
                // dom.css(div,{border;"1px solid red",width:"100px"})
                const object = name;
                for (let key in object) {
                    node.style[key] = object[key];
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className);
        },
        remove(node, className) {
            node.classList.remove(className);
        },
        has(node, className) {
            return node.classList.contains(className);
        }
    },
    on(node, event, fn) {
        node.addEventListener(event, fn);
    },
    off(node, event, fn) {
        node.removeEventListener(event, fn);
    },
    find(selectd, scope) {
        return (scope || document).querySelectorAll(selectd);
    },
    parent(node) {
        return node.parentNode;
    },
    children(parent) {
        return parent.children;
    },
    siblings(node) {
        return Array.from(dom.children(dom.parentNode(node))).filter((item) => item !== node);
    },
    next(node) {
        let nextNode = node.nextSibling;
        while (nextNode && nextNode.nodeType === 3) {
            nextNode = nextNode.nextSibling;
        }
        return nextNode;
    },
    previous(node) {
        let prevNode = node.previousSibling;
        while (prevNode && prevNode.nodeType === 3) {
            prevNode = prevNode.previousSibling;
        }
        return prevNode;
    },
    each(nodes, fn) {
        for (let item of nodes) {
            fn.call(null, item);
        }
    },
    index(node) {
        let parent = dom.parent(node);
        let childList = dom.children(parent);
        for (let i = 0; i < childList.length; i++) {
            if (node === childList[i]) {
                return i;
            }
        }
    }
}
