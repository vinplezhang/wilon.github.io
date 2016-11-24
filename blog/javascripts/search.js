var sreach = function() {
    this.data = [];
    this.ulhtml = '<div class="title"> <h3>$icon$<a target="_blank" href="$url$">$name$</a></h3> </div> <div class="tags"> $tags$ </div> <div class="description"> <p class="des"><pre><code class="$language$">$des$</code></pre></p> </div>';
    this.boxEml = document.getElementById("list-itme");
    this.inputElm = document.getElementById("search");
    this.info = document.getElementById("info");
    this.tagsEml = document.getElementById("tags");
    this.error = document.getElementById("error");
    this.loadingEml = document.getElementById("spinner");
    this.page_size = 70;
    this.domainReg = /[a-zA-Z0-9]{0,62}.\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
    this.page_no = 1, this.tags = [];
    this.language = {
        'git': 'bash',
        'svn': 'bash',
        'vim': 'bash',
    }
    if (this.boxEml) { this.init() }
};
sreach.prototype = {
    // 字符串-关键字匹配
    isSreachIndexOF: function(oldstr, kw) {
        var istrue = false;
        if (oldstr && toString.call(oldstr) === "[object Array]") {
            for (var i = 0; i < oldstr.length; i++) {
                oldstr[i].toLowerCase() === kw.toLowerCase() ? istrue = true : null
            }
            return istrue;
        }
        if (!oldstr || !kw) return false;
        // 支持正则
        var regexp = new RegExp(kw, "ig");
        if (regexp.test(oldstr)) return true;
        return oldstr.toLowerCase().indexOf(kw.toLowerCase()) > -1 ? true : false
    },
    simple: function(str, obj) {
        return str.replace(/\$\w+\$/gi, function(matchs) {
            var returns = obj[matchs.replace(/\$/g, "")];
            return typeof returns === "undefined" ? "" : returns;
        })
    },
    loading: function() {
        var canvas = this.loadingEml,
            ctx = canvas.getContext("2d"),
            w = canvas.width,
            h = canvas.height,
            x = w / 2,
            y = h / 2,
            radius = 16;
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.globalAlpha = .2;
        ctx.fillRect(0, 0, w, h);
        var r = [.25, 1, 1.75, 2.15, 3, 5];
        var angle = [10, 25, 45, 65, 90, 120];
        var alpha = [0, .25, .35, .45, .65, .8, 1];
        var x1 = [],
            y1 = [];
        setInterval(function() {
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.fillRect(0, 0, w, h);
            x1 = [];
            y1 = [];
            for (var i = 0; i < r.length; i++) {
                if (angle[i] >= 360) angle[i] = 0;
                ctx.beginPath();
                ctx.font = "1rem sans-serif";
                ctx.fillStyle = "rgba(0,0,0," + alpha[i] + ")";
                x1.push(x + radius * Math.cos(angle[i] * Math.PI / 180));
                y1.push(y + radius * Math.sin(angle[i] * Math.PI / 180));
                ctx.arc(x1[i], y1[i], r[i], 0, 2 * Math.PI, true);
                ctx.closePath();
                ctx.fill();
                angle[i] += 6;
            }
        }, 10)
    },
    itemHTML: function(arr, type, keywolds) {
        var name = arr.name,
            des = arr.des,
            self = this,
            reg = new RegExp("(" + keywolds + ")", "ig"),
            language = self.language[arr.tags[0]];
        if (type === "search") {
            name = arr.name.replace(reg, '<i class="kw">' + "$1" + "</i>");
            des = arr.des.replace(reg, '<i class="kw">' + "$1" + "</i>") || ""
        }
        return this.simple(this.ulhtml, {
            name: name,
            url: arr.url,
            des: des || "",
            language: typeof language == 'undefined' ? '' : language,
            icon: function() {
                var dm = self.domainReg.exec(arr.url);
                if (arr.icon) {
                    return '<img class="' + arr.icon + '" />'
                } else {
                    if (dm && dm[0]) {
                        return '<img src="' + dm[0] + '/favicon.ico"  onerror="this.remove()" />'
                    } else {
                        return ""
                    }
                }
            }(),
            tags: function(tags) {
                var _tags_html = tags.join("</span><span>");
                return _tags_html && _tags_html != "" ? "<span>" + _tags_html + "</span>" : ""
            }(arr.tags || [])
        })
    },
    // 加载所有li
    creatListHTML: function(num) {
        var arr = this.data,
            self = this,
            page_size = this.page_size,
            i = num || 0;
        if (arr && arr.length && toString.call(arr).indexOf("Array") > -1) {
            for (; i < page_size; i++) {
                if (!arr[i]) break;
                var myLi = self.itemHTML(arr[i]);
                $('#list-itme').append("<li id='"+arr[i].id+"'>"+myLi+"<li>")
            }
        }
    },
    // 搜索关键字
    createSreachListHTML: function(keywolds) {
        var eml = this.boxEml,
            self = this,
            arr = this.data,
            page_size = this.page_size,
            total = 0;
        for (var i = 0; i < arr.length; i++) {
            if (!arr[i]) break;
            if (total > page_size) break;
            if (self.isSreachIndexOF(arr[i].name+arr[i].des, keywolds)) {
                // 能搜到
                $('#'+arr[i].id).show();
            }
        }
    },
    getTagsAll: function() {
        var arr = this.data,
            tags = [];
        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].tags && arr[i].tags.length > 0) {
                    for (a in arr[i].tags) { tags.indexOf(arr[i].tags[a]) === -1 ? tags.push(arr[i].tags[a]) : null }
                }
            }
            this.tags = tags
        }
    },
    createTagsHTML: function(keywolds) {
        var html_str = "",
            self = this,
            elm = this.tagsEml,
            keywolds = keywolds.replace(/^(:|：)/, ""),
            reg = new RegExp("(" + keywolds + ")", "ig");
        elm.innerHTML = "";
        for (var i = 0; i < this.tags.length; i++) {
            var mySpan = document.createElement("SPAN");
            mySpan.innerHTML = this.tags[i].replace(reg, '<i class="kw">' + "$1" + "</i>");
            if (self.isSreachIndexOF(this.tags[i], keywolds)) { elm.appendChild(mySpan) } else if (keywolds === "") { elm.appendChild(mySpan) }
            self.bindEvent(mySpan, "click", function(e) {
                self.inputElm.value = ":" + this.innerText;
                self.changeKeyworlds(":" + this.innerText)
            })
        }
    },
    createTagsListHTML: function(keywolds) {
        var eml = this.boxEml,
            arr = this.data,
            self = this,
            page_size = this.page_size,
            total = 0,
            keywolds = keywolds.replace(/^(:|：)/, "");
        for (var i = 0; i < arr.length; i++) {
            if (!arr[i]) break;
            if (total > page_size) break;
            if (!kw || arr[i] && arr[i].tags && this.isSreachIndexOF(arr[i].tags, keywolds)) {
                var myLi = self.itemHTML(arr[i], "tags", keywolds);
                $('#tags').append(myLi);
                ++total
            }
        }
    },
    isErrorInfo: function() {
        var kw = $('#search').val();
        if (/^(:|：)/.test(kw)) {
            this.tagsEml.className = "show";
            this.createTagsHTML(kw);
            return
        } else { this.tagsEml.className = "hide" }
        this.boxEml.innerHTML == "" ? this.error.className = "error" : this.error.className = "hide"
    },
    bindEvent: function(elm, type, handle) {
        if (elm.addEventListener) { elm.addEventListener(type, handle, false) } else if (elm.attachEvent) { elm.attachEvent("on" + type, handle) }
    },
    // 列表数据加载
    valToHTML: function(kw) {
        var self = this;
        if (kw) {
            if (/^(:|：)/.test(kw)) {
                self.createTagsListHTML(kw);
            } else {
                kw = kw.toLowerCase();
                kw = kw.replace(/[\s\(\)]+/, '(.*?)');
                self.createSreachListHTML(kw);
            }
        } else {
            $('#list-itme li').show();
        }
        self.isErrorInfo(kw);
    },
    changeKeyworlds: function(val) {
        $('#list-itme li').hide();
        this.valToHTML(val)
    },
    // 搜索数据初始化
    init: function() {
        var self = this;
        // loading动画
        $('#spinner').show();
        this.loading();
        // 加载data数据
        $.ajax({
            url: dataUrl,
            type: 'get',
            dataType: 'json',
            async: false
        }).done(function(dt) {
            // 加载成功，处理json数据
            for (var j = 0; j < dt.length; j++) {
                var newDt = dt[j];
                newDt.id = newDt.tag+j;
                newDt.url = "javascript:;";
                newDt.name = newDt.tag.toUpperCase() + ": " + newDt.name;
                newDt.tags = [newDt.tag];
                newDt.icon = ["icon-"+newDt.tag];
                var rand = Math.floor(Math.random() * self.data.length);
                self.data.splice(rand, 0, dt[j]);
            }
            // 加载完最后一条
            // 右上角
            $('#info').html("共计<i> " + self.data.length + " </i>条微笔记 ｜ ");
            // 搜索绑定
            $('#search').on('keyup', function() {
                var val = $(this).val();
                self.changeKeyworlds(val);
            });
            // 加载数据html
            self.creatListHTML();
            // 取消load
            $('#spinner').hide();
        });
    }
};
new sreach;

$(function() {
    // 代码高亮
    hljs.initHighlightingOnLoad();
    // 搜索框焦点
    $('#search').focus();
    $('.header,.search,.title,#list-itme li:not(:even)').mouseover(function(event) {
        $('#search').select();
    });
    // 托中复制
    $("body").mouseup(function(e) {
        var text = "";
        if (document.selection) {
            text = document.selection.createRange().text;
        } else if (window.getSelection()) {
            text = window.getSelection();
        }
        if (text != "") {
            try {
                var result = document.execCommand('copy');
            } catch (e) {
                var result = false;
            }
            if (result) {
                $("#tooltip").text('已复制');
            } else {
                $("#tooltip").text('不支持复制( ▼-▼ )');
            }
        }
    }).mousedown(function() {
        $("#tooltip").text('拖动自动复制');
    });
});