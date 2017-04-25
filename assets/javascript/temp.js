		$('#gifs').append(`
			<div id="${i}" class="${gifColumn}">
				<button class="btn btn-default">${response1.list[i].word}</button>
				<hr>
			</div>
		`);

// ____________________________________________________________________________________________________________________________________________________

			for (var j = 0, n = $('#numberOfGifs').val(); j < n; j++) {
				$('#' + i).append(`<img class="gif" src="${response2.data.image_original_url}" alt="${response2.data.caption}">`);
			}

// _____________________________________________________________________________________________________________________________________________________

(`<img class="gif" src="${response2.data[j].images.fixed_height.url}" src-still="${response2.data[j].images.fixed_height_still.url}" src-animate="${response2.data[j].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
(`Rating: ${response2.data[j].rating}<br><br>`);

// _____________________________________________________________________________________________________________________________________________________

$(document).on('click', '.gifButton', function pressGifButton() {
	var count;
	wordPhrase = $(this).text();

	$('.' + wordPhrase).html(`<button class="gifButton btn btn-default">${wordPhrase}</button><hr>`);
	if (count < 100) {
		for (var j = count, o = count + $('#numberOfGifs').val(); j < o; j++) {
			$.ajax({
				async: false,
				url: giphySearchQueryURL + wordPhrase + '&limit=100',
				method: 'GET'
			}).done(function(response2) {
				$('.' + wordPhrase).append(`<img class="gif" src="${response2.data[j].images.fixed_height.url}" src-still="${response2.data[j].images.fixed_height_still.url}" src-animate="${response2.data[j].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
				$('.' + wordPhrase).append(`Rating: ${response2.data[j].rating}<br><br>`);
			});
			count++;
		}
	}
	else if (counter >= 100) {
		count = 0;
		pressGifButton();
	}
});