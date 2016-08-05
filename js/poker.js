$(function() {
		var biao = {};
		var huase = ['c', 'h', 'd', 's'];
		var poker = [];
		while (poker.length < 52) {
			var c = huase[Math.floor(Math.random() * 4)];
			var n = Math.ceil(Math.random() * 13); //ceil向上取整
			if (!biao[c + '_' + n]) {
				poker.push({
					huase: c,
					number: n
				});
				biao[c + '_' + n] = true
			}
		}
		console.log(biao);
		var dict = {
			1: 'A',
			2: '2',
			3: '3',
			4: '4',
			5: '5',
			6: '6',
			7: '7',
			8: '8',
			9: '9',
			10: 'T',
			11: 'J',
			12: 'Q',
			13: 'K',
		};
		var d = 0;
		var index = 0;
		for (var i = 0,index=0; i < 7; i++) {
			var t = i * 60;
			for (var j = 0; j < i + 1; j++) {
				index += 1;
				d += 50;
				var l = ((6 - i) * 45) + j * 100;
				$('<div>').addClass('pai shang').appendTo(".zhuozi").css({
					backgroundImage: 'url(images/' + dict[poker[index].number] + poker[index].huase + '.png)'
				}).attr('id', i + '_' + j)
					.data('number', poker[index].number).delay(d).animate({
						top: t,
						left: l,
						opacity: 1
					})
			};
		};
		for (; index < poker.length; index++) {
			$('<div>')
				.addClass('pai zuo')
				.appendTo('.zhuozi')
				.css({
					'background-image': 'url(images/' + dict[poker[index].number] + poker[index].huase + '.png)'
				})
				.data('number', poker[index].number)
				.delay(index * 26)
				.animate({
					top: 500,
					left: 100,
					opacity: 1
				})
		}
		var meiyoubeiyazhu = function(el) {

			var x = Number($(el).attr('id').split('_')[0]);
			var y = Number($(el).attr('id').split('_')[1]);
			// console.log(x)
			// if ($('#' + (x + 1) + '_' + y).length && $('#' + (x + 1) + '_' + (y + 1)).length) {
			// 	return true;
			// } else {
			// 	return false;
			// }
			return $('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length;
		}
		var shangyizhang=null;
		$('.zhuozi .pai').on('click', function() {
			if ($(this).hasClass('shang') && meiyoubeiyazhu(this)) {
				$('.tishikuang1').animate({'opacity':1},2000,function(){
					setTimeout(function(){
						$('.tishikuang1').animate({'opacity':0})
					})
				});
				$('.sanjiao1').animate({'opacity':1},2000,function(){
					setTimeout(function(){
						$('.sanjiao1').animate({'opacity':0})
					})
				});
				return;
			}
			if ($(this).data('number') === 13) {
				$(this).animate({
					top: 0,
					left: 600,
					opacity: 0
				}).queue(function() {
					$(this).remove();
				})
				return;
			}
			$(this).toggleClass('chulie');
			if ($(this).hasClass('chulie')) {
				$(this).animate({
					top: '-=30'
				})
			} else {
				$(this).animate({
					top: '+=30'
				})
			}
			//diyicidianji
			if (!shangyizhang) {
				shangyizhang = $(this);
			} else {
				//diercidianji
				if (shangyizhang.data('number') + $(this).data('number') === 13) {
					$('.zhuozi .chulie').delay(400).animate({
						top: 0,
						left: 600,
						opacity: 0,
					}).queue(function() {
						$(this).remove();
					})
				} else {
					// passm.style.display="block";
		   //          setTimeout(function(){
		   //              passm.style.display="none";

		   //          },2000)
                    // return;
					$('.tishikuang').animate({'opacity':1},2000,function(){
						setTimeout(function(){
							$('.tishikuang').animate({'opacity':0})
						})
					});
					$('.sanjiao').animate({'opacity':1},2000,function(){
						setTimeout(function(){
							$('.sanjiao').animate({'opacity':0})
						})
					});
					$('.zhuozi .chulie').removeClass('chulie').animate({
						top: '+=30'
					})
				}

				shangyizhang = null;
			}
		})
		var zIndex = 0;
		$('.zhuozi .move-right').on('click', function() {
			zIndex += 1;
			$('.zhuozi .pai.zuo').eq(-1).removeClass('zuo').addClass('you').animate({
				top: 500,
				left: 400
			}).css({
				zIndex: zIndex
			})
		})
		var cishu = 0;
		$('.zhuozi .move-left').on('click', function() {

			if ($('.zhuozi .zuo').length) {
				return;
			}
			if (cishu > 3) {
				return;
			}

			$('.zhuozi .you').each(function(i, el) {

				$(this).delay(i * 30).animate({
					top: 500,
					left: 100
				}).css({
					'zIndex': 0
				}).removeClass('you').addClass('zuo')
			})
		})
})