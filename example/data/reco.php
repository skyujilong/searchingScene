<?php
	
	header('Content-type:text/json');
	
	$json = '{
	"result" : {
		"summary" : {
			"refundMoney" : {
				"amount" : "-263.13",
				"count" : 4
			},
			"serviceFee" : {
				"amount" : "0.00"
			},
			"transMoney" : {
				"amount" : "2020.00",
				"count" : 4
			},
			"orderMoney" : {
				"amount" : "2263.00",
				"count" : 6
			}
		},
		"detail" : [{
			"tradeType" : "即时到帐",
			"tradeStatus" : "成功",
			"actualChargeAmount" : "0.00",
			"gmtCreate" : "2014-04-23 20:08:42",
			"tradeRefundAmount" : "-146.11",
			"tradeNo" : "2014042315450136",
			"direction" : "卖出",
			"hasRefund" : "有退款",
			"outTradeNo" : "523504188457927",
			"consumerLoginId" : "cv01@xy.com",
			"tradeFrom" : "外部商户",
			"preferenceAmount" : "0.00",
			"consumerName" : "注意看名字一定要是正确的哦",
			"chargeChannel" : "",
			"rate" : "0.050000",
			"action" : {
				"needDetail" : true,
				"needRefund" : true
			},
			"totalAmount" : "1000.00",
			"goodsTitle" : "商品名称-即时到帐交易",
			"depositBankNo" : ""
		}, {
			"tradeType" : "即时到帐",
			"tradeStatus" : "成功",
			"actualChargeAmount" : "0.00",
			"gmtCreate" : "2014-04-14 10:21:55",
			"tradeRefundAmount" : "-105.02",
			"tradeNo" : "2014041414700136",
			"direction" : "卖出",
			"hasRefund" : "有退款",
			"outTradeNo" : "8825977652520752",
			"consumerLoginId" : "cv01@xy.com",
			"tradeFrom" : "外部商户",
			"preferenceAmount" : "0.00",
			"consumerName" : "注意看名字一定要是正确的哦",
			"chargeChannel" : "",
			"rate" : "",
			"action" : {
				"needDetail" : true,
				"needRefund" : true
			},
			"totalAmount" : "1000.00",
			"goodsTitle" : "商品名称-即时到帐集分宝交易",
			"depositBankNo" : ""
		}, {
			"tradeType" : "担保交易",
			"tradeStatus" : "待付款",
			"actualChargeAmount" : "0.00",
			"gmtCreate" : "2014-04-11 17:17:13",
			"tradeRefundAmount" : "0.00",
			"tradeNo" : "2014041120402549",
			"direction" : "卖出",
			"hasRefund" : "",
			"outTradeNo" : "52609288413304",
			"consumerLoginId" : "dongrui21@alitest.com",
			"tradeFrom" : "外部商户",
			"preferenceAmount" : "0.00",
			"consumerName" : "冬瑞二一",
			"chargeChannel" : "",
			"rate" : "",
			"action" : {
				"needDetail" : true,
				"needRefund" : false
			},
			"totalAmount" : "143.00",
			"goodsTitle" : "外部商户担保交易测试-确认收货",
			"depositBankNo" : ""
		}, {
			"tradeType" : "即时到帐",
			"tradeStatus" : "成功",
			"actualChargeAmount" : "0.00",
			"gmtCreate" : "2014-04-10 17:16:46",
			"tradeRefundAmount" : "-6.00",
			"tradeNo" : "2014041014400636",
			"direction" : "卖出",
			"hasRefund" : "有退款",
			"outTradeNo" : "6802449313032804",
			"consumerLoginId" : "cv01@xy.com",
			"tradeFrom" : "外部商户",
			"preferenceAmount" : "10.00",
			"consumerName" : "注意看名字一定要是正确的哦",
			"chargeChannel" : "积分支付",
			"rate" : "0.050000",
			"action" : {
				"needDetail" : true,
				"needRefund" : true
			},
			"totalAmount" : "10.00",
			"goodsTitle" : "商品名称-即时到帐集分宝交易",
			"depositBankNo" : ""
		}, {
			"tradeType" : "即时到帐",
			"tradeStatus" : "成功",
			"actualChargeAmount" : "0.00",
			"gmtCreate" : "2014-04-10 17:13:34",
			"tradeRefundAmount" : "-6.00",
			"tradeNo" : "2014041014400536",
			"direction" : "卖出",
			"hasRefund" : "有退款",
			"outTradeNo" : "8854946099668174",
			"consumerLoginId" : "cv01@xy.com",
			"tradeFrom" : "外部商户",
			"preferenceAmount" : "10.00",
			"consumerName" : "注意看名字一定要是正确的哦",
			"chargeChannel" : "红包支付",
			"rate" : "0.050000",
			"action" : {
				"needDetail" : true,
				"needRefund" : true
			},
			"totalAmount" : "10.00",
			"goodsTitle" : "商品名称-即时到帐红包交易",
			"depositBankNo" : ""
		}, {
			"tradeType" : "即时到帐",
			"tradeStatus" : "关闭",
			"actualChargeAmount" : "0.00",
			"gmtCreate" : "2014-04-10 17:09:16",
			"tradeRefundAmount" : "0.00",
			"tradeNo" : "2014041014400436",
			"direction" : "卖出",
			"hasRefund" : "",
			"outTradeNo" : "2604582012081358",
			"consumerLoginId" : "cv01@xy.com",
			"tradeFrom" : "外部商户",
			"preferenceAmount" : "0.00",
			"consumerName" : "注意看名字一定要是正确的哦",
			"chargeChannel" : "",
			"rate" : "",
			"action" : {
				"needDetail" : true,
				"needRefund" : false
			},
			"totalAmount" : "100.00",
			"goodsTitle" : "商品名称-即时到帐红包交易",
			"depositBankNo" : ""
		}],
		"paging" : {
			"sizePerPage" : 20,
			"totalItems" : 24,
			"current" : 1
		}
	},
	"status" : "succeed",
	"sellTransForm" : {
		"billUserId" : "2088101131356320",
		"endAmount" : "",
		"endTime" : "2014-05-09",
		"goodsTitle" : "",
		"pageNum" : "1",
		"pageSize" : "20",
		"searchableCardListJson" : "",
		"sortTarget" : "gmtCreate",
		"sortType" : "0",
		"startAmount" : "",
		"startTime" : "2014-04-10",
		"status" : "ALL",
		"targetMainAccount" : "",
		"tradeFrom" : "ALL",
		"tradeType" : "0"
	},
	"queryForm" : {
		"billUserId" : "2088101131356320",
		"endAmount" : "",
		"endTime" : "2014-05-09",
		"goodsTitle" : "",
		"pageNum" : "1",
		"pageSize" : "20",
		"searchableCardListJson" : "",
		"sortTarget" : "gmtCreate",
		"sortType" : "0",
		"startAmount" : "",
		"startTime" : "2014-04-10",
		"status" : "ALL",
		"targetMainAccount" : "",
		"tradeFrom" : "ALL",
		"tradeType" : "0"
	}
}';
	
	echo $json;
	
?>