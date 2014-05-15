## 简介 ##
searchingScene是一套非常轻量的富客户查询模型，同时它也支持Single Form应用场景，内部是基于cellula v0.4.1构建，依赖了jQuery 1.7.2，当然也可以依赖任意第三方js类库，可以使用seajs的require(...)，也可以将类库加到namespace中去。

整个模型由formItem，form，table，paginator几个类组成；

tips: 

- single Form只使用 form+formItem组合，searchingScene使用form+formItem+table+paginator组合

----------

**FormItem**
每一个表单控件可以是一个formItem，以下构建一个formItem

    var UserName = new Class('UserName', {
				//require: false,
				type: 'input',
				label : '姓名',
				init : function(conf) {
					this._super(conf);
				},
				rule: {
					isString: function() {
						if (!/[\u4e00-\u9fa5]+/.test(this.element.value)) {
							this.errorMessage = this.label + '只能包含中文字符';
							return false;
						}
						return true;
					}
				}
			}).inherits(SearchingScene.FormItem);

@require Boolean ：是否校验，如果设置为`false`则会跳过校验，但是如果非空同时有验证规则还是会进行校验的；

@element Object ：控件原生dom节点，如果是一个组合的控件域，则为一个Dom Array，比如，一个日期时间范围的组合控件，`this.element[0]`则对应第一个控件的对象，`this.element[1]`对应第二个控件的对象，以此类推，每个控件对象的结构如下：

      {
	 	  ele: element, 
	      name: name, 
	      value: value 
	  }

以下给出一个组合控件域的具体实现demo：

    var ApplyDate = new Class('ApplyDate', {
			//require: false,
			type : 'input',
			label : '申请时间',
			startCal : null,
			endCal : null,
			startDateInput : undefined,
			endDateInput : undefined,
			config : {
				calendarRangeStart : (new Date() - 557 * 24 * 3600 * 1000),
				calendarRangeEnd : (new Date())
			},
			init : function(conf) {
				this._super(conf);
				this._bindAll('changeDateRange');
				this.startDateInput = this.element[0]['ele'];
				this.endDateInput = this.element[1]['ele'];
				// default callback today date
				this.startDateInput.value = this.getCurrentDate();
				this.endDateInput.value = this.getCurrentDate();
				//...
				$('a[data-picker]', this.rootNode).on('click', this.changeDateRange);
			},
			changeDateRange : function(e) {
				//...
			},
			getCurrentDate : function() {
				//...
			}
		}).inherits(SearchingScene.FormItem);

@label String ：控件对应的label

@errorMessage String ：自定义报错文案

@type String ：控件的类型，目前支持`input` `select` `radio` `checkbox` `textarea`

@rule Objict ：对象中的每个Func将是一个校验规则，返回`true`|`false`表示校验通过与否

@triggerValidate Function ：手动触发校验

----------

tips: 

- 如果需要对控件绑定其它事件则可以在init构造函数初始化中完成
- formItem对`input`,`textarea`默认绑定了blur，focus事件


**Form**
以下构建一个Form

    var ResumeForm = new Class('ResumeForm', {
		type: 'single', // single Form 
		itemList: null,
		init: function(conf) {
			this._super(conf);
			this.collection = new Coll({ type: SearchingScene.FormItem });
			this.createItem();
		},
		createItem: function() {
			util.each(this.itemList, function(item) {
				// 因为在Form submit之前还需要对coll中的每个formItem进行校验
				this.register('FORMITEM:VALIDATE', item);
				this.collection.push(item);
			}, this);
		},
		// 如果type:'single'则可以重写submit方法
		submit: function(e) {
			e.preventDefault();
			// validate all FormItem...
			this.validate();
			if (this.validateAll) {
				//submit...
				console.log( this.getData() );
			}
		}
	}).inherits(SearchingScene.SearchingForm);

@validateAll Boolean ：`true`|`false` 表示表单校验是否通过

@customSearch Function ：自定义查询接口，在使用searchingScene查询场景时使用，例如：

    		/*
			 * Allow the custom query
			 */
			customSearch: function(data) {
				console.log('request:', data);
				var _self = this;
				this.ajaxLoadingBox.show();
				this.asyn = $.ajax({
					url: '/searchingScene/example/data/reco.php',
					type: 'POST',
					data: data,
					timeout: 10000,
					success: function(resp) {
						console.log('response:', resp);
						if (resp.status == 'succeed') {
							_self.ajaxLoadingBox.hide();
							_self.dataDispatch(resp);
						} else 
							this.emit('FORM:SYSTEMERROR');
					},
					error: function(xhr, stat, error) {
						_self.ajaxLoadingBox.hide();
						this.emit('FORM:SYSTEMERROR');
						window.debug && console.log('error: ', xhr, stat, error);
					}
				});
			}



## Single Form 应用场景 ##



## Searching Form 应用场景 ##