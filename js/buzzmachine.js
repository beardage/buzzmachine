
// buzzmachine
var buzzmachine = function(undefined){

	var maxTime = 4000; // animation time, ms
	var height = 840; // height of 3 slot items stacked
	var slotSpeeds = []; // animation speed of slot roll
	var result = []; // array of result topScrolls
	var slots = []; // constructed slot jagged array
	var $slots;  // jquery slots
	var started; // undefined for checking / time

	function init(){

		// construct jagged array for slots
		slotItemArray = [];
		$slots = $('.slot').each(function(index, element){
			$('.slot-item', this).each(function(itemIndex, itemElement){
				slotItemArray.push($(itemElement).data('id'));
			});
			slots.push(slotItemArray);
			slotItemArray = [];
		});

		$('.button-lever').on('click', spin);
	}

	function spin(){
		if (started !== undefined) {
            return;
        }

        // reset results from previous spins
        $('body').removeClass('coffee-winner');
        $('body').removeClass('tea-winner');
        $('body').removeClass('espresso-winner');
        $('.message-result').hide();
        $('.message-spin').show();

		// get values for slot speeds and result array
		for (var i = 0; i < 3; i++) {
            // speed array
			slotSpeeds[i] = Math.random() + 1.5;
            // result array
			result[i] = (Math.random() * 3 | 0) * height / 3;
		}

		animate();
	}

	function animate(now){
        // if started is underfined, set started to now
		if (!started) started = now;

		var time = now - started || 0;

		for (var i = 0; i < 3; i++) {
            // Set the number of pixels scrolled.
            // spin and then scroll to result scrollTop
			$slots[i].scrollTop = (slotSpeeds[i] / maxTime / 2 * (maxTime - time) * (maxTime - time) + result[i]) % height | 0;
        }

        // if time not expired, animate next frame
		if (time < maxTime) {
        	requestAnimationFrame(animate);
        }
		else {
            // reset started check and check winner
			started = undefined;
			checkWinner();
		}
	}

	function checkWinner(){
        if (result[0] === result[1] && result[1] === result[2]) {

            // results match, now match result to item
            var sTop = result[0];
            switch (sTop) {
                case 0:
                    // coffee sTop
                    $('body').addClass('coffee-winner');
                    $('.message-spin').hide();
                    $('.message-coffee').show();
                    break;
                case 280:
                    // tea sTop
                    $('body').addClass('tea-winner');
                    $('.message-spin').hide();
                    $('.message-tea').show();
                    break;
                case 560:
                    // espress sTop
                    $('body').addClass('espresso-winner');
                    $('.message-spin').hide();
                    $('.message-espresso').show();
                    break;
            }
        }
	}

	return {init: init}

} ();

$(buzzmachine.init);
