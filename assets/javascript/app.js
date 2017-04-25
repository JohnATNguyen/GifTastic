var urbanRandomQueryUrl = "https://api.urbandictionary.com/v0/random"
var urbanDefineQueryUrl = "https://api.urbandictionary.com/v0/define?term="
var giphySearchQueryUrl = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="
var giphyTrendingQueryUrl = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=100"
var numberOfAutopopulatedColumns = 3;
var numberOfColumns = 6;
var gifColumnClass = `col-xl-${12/numberOfColumns} col-lg-${12/numberOfColumns} col-md-${12/numberOfColumns} col-sm-${12/numberOfColumns} col-xs-${12/numberOfColumns}`
var gifNumber;
var wordPhraseAltered;
var randomTrendingGif;
var words = 0;

function main() {
	gifNumber = parseInt($('#numberOfGifs').val());

	if (gifNumber >= 1 && gifNumber <= 10) {
		$('#status').hide();
		$('#gifs').empty();
		$.ajax({
			async: false,
			url: urbanRandomQueryUrl,
			method: 'GET'
		}).done(function(response1) {
			for (var i = 0; i < numberOfAutopopulatedColumns; i++) {
				wordPhraseAltered = response1.list[i].word.replace(/ /g, '_');
				$('#gifs').append(`
					<div id="${wordPhraseAltered}" class="${gifColumnClass}" value="${i}" count='0' bill="true">
						<button class="gifButton btn btn-default">${response1.list[i].word}</button>
						<hr>
					</div>
				`);
				for (var j = 0, o = gifNumber; j < o; j++) {
					$.ajax({
						async: false,
						url: giphySearchQueryUrl + wordPhraseAltered.replace(/_/g, '+'),
						method: 'GET'
					}).done(function(response2) {
						if (response2.data[j] == undefined) {
							$(`#${wordPhraseAltered}`).append(`No (more) Giph's. Enjoy this one instead!`);
							$.ajax({
								async: false,
								url: giphyTrendingQueryUrl,
								method: 'GET'
							}).done(function(response3) {
								randomTrendingGif = Math.floor(Math.random() * 100);
								$(`#${wordPhraseAltered}`).append(`<img class="gif" src="${response3.data[randomTrendingGif].images.fixed_height.url}" src-still="${response3.data[randomTrendingGif].images.fixed_height_still.url}" src-animate="${response3.data[randomTrendingGif].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
								$(`#${wordPhraseAltered}`).append(`<p>Rating: ${response3.data[randomTrendingGif].rating}</p><br>`);	
							});
						}
						else {
							$(`#${wordPhraseAltered}`).append(`<img class="gif" src="${response2.data[j].images.fixed_height.url}" src-still="${response2.data[j].images.fixed_height_still.url}" src-animate="${response2.data[j].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
							$(`#${wordPhraseAltered}`).append(`<p>Rating: ${response2.data[j].rating}</p><br>`);
						}
					});
					$(`#${wordPhraseAltered}`).attr('count', j);
				}
				words++;
			}
		});
	}
	else {
		$('#status').text(`Invalid number of gif's!`);
    	$('#status').show();
	}
}

function random() {
	gifNumber = parseInt($('#numberOfGifs').val());

	if (gifNumber >= 1 && gifNumber <= 10) {
		$('#status').hide();
		$.ajax({
			async: false,
			url: urbanRandomQueryUrl,
			method: 'GET'
		}).done(function(response1) {
			var	wordPhraseAltered = response1.list[0].word.replace(/ /g, '_');
			$('#gifs').append(`
				<div id="${wordPhraseAltered}" class="${gifColumnClass}" value="${words}" count='0' bill="true">
					<button class="gifButton btn btn-default">${response1.list[0].word}</button>
					<hr>
				</div>
			`);
			for (var j = 0, o = gifNumber; j < o; j++) {
				$.ajax({
					async: false,
					url: giphySearchQueryUrl + wordPhraseAltered.replace(/_/g, '+'),
					method: 'GET'
				}).done(function(response2) {
					if (response2.data[j] == undefined) {
						$(`#${wordPhraseAltered}`).append(`No (more) Giph's. Enjoy this one instead!`);
						$.ajax({
							async: false,
							url: giphyTrendingQueryUrl,
							method: 'GET'
						}).done(function(response3) {
							randomTrendingGif = Math.floor(Math.random() * 100);
							$(`#${wordPhraseAltered}`).append(`<img class="gif" src="${response3.data[randomTrendingGif].images.fixed_height.url}" src-still="${response3.data[randomTrendingGif].images.fixed_height_still.url}" src-animate="${response3.data[randomTrendingGif].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
							$(`#${wordPhraseAltered}`).append(`<p>Rating: ${response3.data[randomTrendingGif].rating}</p><br>`);	
						});
					}
					else {
						$(`#${wordPhraseAltered}`).append(`<img class="gif" src="${response2.data[j].images.fixed_height.url}" src-still="${response2.data[j].images.fixed_height_still.url}" src-animate="${response2.data[j].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
						$(`#${wordPhraseAltered}`).append(`<p>Rating: ${response2.data[j].rating}</p><br>`);
					}
				});
				$(`#${wordPhraseAltered}`).attr('count', j);
			}
			words++;
		});
	}
	else {
		$('#status').text(`Invalid number of gif's!`);
    	$('#status').show();
	}
}

main();

$(document).on('click', '.gif', function() {
	var state = $(this).attr('state');
	if (state == 'animate') {
		$(this).attr('src', $(this).attr('src-still'));
		$(this).attr('state', 'still');
	}
	else if (state == 'still') {
		$(this).attr('src', $(this).attr('src-animate'));
		$(this).attr('state', "animate");
	}
});

$("#searchbutton").on("click", function() {
    event.preventDefault();

   	wordPhrase = $('#wordPhraseInput').val()

    if (wordPhrase.length == 0) {
    	$('#status').text('Please enter a word/phrase.')
    	$('#status').show();
    }
    else {
		$.ajax({
			url: urbanDefineQueryUrl + wordPhrase.replace(/ /g, '+'),
			method: 'GET'
		}).done(function(response1) {
			if (response1.list.length == 0) {
				$('#status').text('That word/phrase is not in Urban Dictionary!');
				$('#status').show();
			}
			else {
				$('#status').hide();
				$('#gifs').append(`
					<div id="${words}" class="${wordPhrase} ${gifColumnClass}" count='0' bill="false">
						<button class="gifButton btn btn-default">${wordPhrase}</button>
						<hr>
					</div>
				`);
				for (var j = 0, o = parseInt($('#numberOfGifs').val()); j < o; j++) {
					$.ajax({
						async: false,
						url: giphySearchQueryUrl + wordPhrase.replace(/ /g, '+'),
						method: 'GET'
					}).done(function(response2) {
						$('#' + words).append(`<img class="gif" src="${response2.data[j].images.fixed_height.url}" src-still="${response2.data[j].images.fixed_height_still.url}" src-animate="${response2.data[j].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
						$('#' + words).append(`<p>Rating: ${response2.data[j].rating}</p><br>`);
					});
				}
				words++;
			}
		});
	}
});

$(document).on('click', '.gifButton', function() {
	wordPhrase = $(this).text();

	$('.' + wordPhrase).html(`<button class="gifButton btn btn-default">${wordPhrase}</button><hr>`);

	$.ajax({
		async: false,
		url: giphySearchQueryUrl + wordPhrase.replace(/ /g, '+') + '&limit=100',
		method: 'GET'
	}).done(function(response2) {
		var gifCount = parseInt($('.' + wordPhrase).attr('count'));
		var underOneHundo = $('.' + wordPhrase).attr('bill')
		if (underOneHundo) {
			for (var j = gifCount, o = gifCount + parseInt($('#numberOfGifs').val()); j < o; j++) {
				$('.' + wordPhrase).append(`<img class="gif" src="${response2.data[j].images.fixed_height.url}" src-still="${response2.data[j].images.fixed_height_still.url}" src-animate="${response2.data[j].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
				$('.' + wordPhrase).append(`<p>Rating: ${response2.data[j].rating}</p><br>`);
				gifCount++;
				if (gifCount >= 99) {
					underOneHundo = false;
				}
			}
			$('.' + wordPhrase).attr('count', gifCount);
			$('.' + wordPhrase).attr('bill', underOneHundo);
			console.log($('.' + wordPhrase).attr('bill'));
		}
		else if (!underOneHundo) {
			for (var i = 0, n = parseInt($('#numberOfGifs').val()); i < n; i++) {
				gifCount = Math.floor(Math.random() * 100);
				$('.' + wordPhrase).append(`<img class="gif" src="${response2.data[gifCount].images.fixed_height.url}" src-still="${response2.data[gifCount].images.fixed_height_still.url}" src-animate="${response2.data[gifCount].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
				$('.' + wordPhrase).append(`<p>Rating: ${response2.data[gifCount].rating}</p><br>`);
			}
			$('.' + wordPhrase).attr('count', gifCount);
			$('.' + wordPhrase).attr('bill', underOneHundo);
		}	
	});
	console.log($('.' + wordPhrase).attr('count'));
});