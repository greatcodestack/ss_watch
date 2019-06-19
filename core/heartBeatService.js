const ping = require('ping');
const fetch = require('node-fetch');
const { host } = require('../config');
let state = {}

var init = module.exports = {
	returnState: function () {
		return state;
	},

	// 返回状态和相应时间
	watch: function () {
		host.forEach((ip) => {
			// timeout单位为秒
			ping.promise.probe(ip, { timeout: 1 })
				.then((rs) => {
					console.log('状态: ' + rs.alive, '响应: ' + rs.time)
					state[ip] = { alive: rs.alive, time: rs.time };
				})
				.catch((err) => {
					init.sendEmail(
						[
							'yendax@outlook.com',
							'i@vkc.io',
							'1532106001@qq.com'
						],
						`${ip}节点拥堵`,
						`<body><div style="font-weight: 'bold'">超时超过: 1秒, ${err.message}</div></body>`
					)
				})
		})
	},

	sendEmail: function (emails, title, body) {
		emails.forEach((e) => {
			fetch('http://sti8ia.natappfree.cc/common/customEmail', {
				method: 'post',
				body: JSON.stringify({
						email: null,
						title,
						html: body
					}),
				headers: { 'Content-Type': 'application/json' }
			})
				.then((rs) => {
					return rs.json()
				})
				.then((json) => {
					console.log(json);
					if (json.status === 200) {
						console.log(json.statusText)
					}
				})
				.catch((error) => {
					console.log(error.message)
				})
		})

	}

};
