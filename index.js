import template from './index.html';
import { Button } from 'veui';
const wordPackage = [
    {
        label: '地域'
    },
    {
        label: '日期'
    },
    {
        label: '旅游'
    }
];
export default {
    template,
    components: {
        'veui-button': Button
    },
    props: {
        editValue: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            // 首次记录父组件传过来的值
            editValueData: this.editValue,
            // 监控标题编辑数据
            monitorData: '',
            // 跟踪光标最后的位置
            trackCursor: 0,
            // 词包mock数据
            packages: wordPackage
        };
    },
    methods: {
        // 监控输入数据
        inputEvent(param) {
            this.monitorData = this.$refs.edit.innerHTML;
        },
        // 获取光标位置
        getCursorPos(input) {
            this.trackCursor = getSelection().getRangeAt(0);
        },
        // 动态插入词包
        addWords(html) {
            getSelection().removeAllRanges();
            getSelection().addRange(this.trackCursor);
            this.$refs.edit.focus();
            let sel, range, node, lastNode;
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    let el = document.createElement('div');
                    el.innerHTML = html;
                    const frag = document.createDocumentFragment();
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            }
        }
    }
};
