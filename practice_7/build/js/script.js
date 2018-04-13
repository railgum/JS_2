$(document).ready(function() {

  var baseUrl = 'http://212.92.98.105';
  var user_id;

  $.ajax({
    url: baseUrl + '/shop',
    // error: function(data) {
    // 	console.log(data)
    // },
    success: function(data) {
      console.log(data);

      user_id = data.user_id;
    }
  })
// drag...............
	$(function() {
		$('#tabs').tabs();
		$('.product').draggable({
			helper: 'clone',
			stop: function() {
				var price = +$(this).find('p:nth-child(3)').text();
				var product = $(this).find('p:nth-child(1)').text();
				$.ajax({
      		url: baseUrl + '/shop?user_id=' + user_id + '&product=' + product + '&price=' + price,
      		type: 'post',
      		success: function(data) {
        		// console.log(data)
// создание div с добавленным товаром
	          $('<div/>', {
	            class: 'selectProduct', 
	            text: product,
	            product_id: data.product_id,
	            product: product,
	            price: price,
// удаление при нажатии на товар в корзине
          		click: function() {
            		product_id = data.product_id
            // alert('Вы нажали на товар в корзине')
            		$.ajax({
             			url: baseUrl + '/shop?user_id=' + user_id + '&product_id=' + product_id,
              		type: 'delete',
              		success: function(data) {
                		console.log(data);
                		$('.product[product_id=' + product_id + '').remove();
                		$total.html(+$total.html() - price);
              		}
            		})
          		}
        		}).appendTo('.cart')

	      		var $total = $('.total')

        		$total.html(+$total.html() + price)
					}
				});
			}
		})
// &drop.................
		$('#product-input').droppable({
			drop: function() {
				$(this).attr('placeholder', 'Товар в корзине');

			}
		})
	})
})