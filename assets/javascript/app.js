var urbanRandomQueryUrl = "https://api.urbandictionary.com/v0/random"
var urbanDefineQueryUrl = "https://api.urbandictionary.com/v0/define?term="
var giphySearchQueryUrl = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="
var giphyTrendingQueryUrl = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=100"
var numberOfAutopopulatedColumns = 2;
var numberOfColumns = 6;
var gifColumnClass = `col-xl-${12/numberOfColumns} col-lg-${12/numberOfColumns} col-md-${12/numberOfColumns} col-sm-${12/numberOfColumns} col-xs-${12/numberOfColumns}`
var col = 1;
var row = 0;
var gifNumber;
var wordPhraseAltered;
var randomTrendingGif;
var randomSearchedGif;

function main() {
	col = 1;
	row = 0;
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
				if (col % 6 == 1) {
					row++;
					$('#gifs').append(`<div id="row${row}" class="row"></div>`);
					$(`#row${row}`).append(`
						<div id="${wordPhraseAltered}" class="${gifColumnClass}">
							<button class="gifButton btn btn-default">${response1.list[i].word}</button>
							<hr>
						</div>
					`);
					$.ajax({
						async: false,
						url: giphySearchQueryUrl + wordPhraseAltered.replace(/_/g, '+'),
						method: 'GET'
					}).done(function(response2) {
						for (var j = 0, o = gifNumber; j < o; j++) {
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
								randomSearchedGif = Math.floor(Math.random() * response2.data.length);
								$(`#${wordPhraseAltered}`).append(`<img class="gif" src="${response2.data[randomSearchedGif].images.fixed_height.url}" src-still="${response2.data[randomSearchedGif].images.fixed_height_still.url}" src-animate="${response2.data[randomSearchedGif].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
								$(`#${wordPhraseAltered}`).append(`<p>Rating: ${response2.data[randomSearchedGif].rating}</p><br>`);
							}
						}				
					});
				}
				else if (col % 6 != 1) {
					$(`#row${row}`).append(`
						<div id="${wordPhraseAltered}" class="${gifColumnClass}">
							<button class="gifButton btn btn-default">${response1.list[i].word}</button>
							<hr>
						</div>
					`);
					$.ajax({
						async: false,
						url: giphySearchQueryUrl + wordPhraseAltered.replace(/_/g, '+'),
						method: 'GET'
					}).done(function(response2) {
						for (var j = 0, o = gifNumber; j < o; j++) {
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
								randomSearchedGif = Math.floor(Math.random() * response2.data.length);
								$(`#${wordPhraseAltered}`).append(`<img class="gif" src="${response2.data[randomSearchedGif].images.fixed_height.url}" src-still="${response2.data[randomSearchedGif].images.fixed_height_still.url}" src-animate="${response2.data[randomSearchedGif].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
								$(`#${wordPhraseAltered}`).append(`<p>Rating: ${response2.data[randomSearchedGif].rating}</p><br>`);
							}
						}				
					});
				}
				col++;
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
			wordPhraseAltered = response1.list[0].word.replace(/ /g, '_');
			if (col % 6 == 1) {
				row++;
				$('#gifs').append(`<div id="row${row}" class="row"></div>`);
				$(`#row${row}`).append(`
					<div id="${wordPhraseAltered}" class="${gifColumnClass}">
						<button class="gifButton btn btn-default">${response1.list[0].word}</button>
						<hr>
					</div>
				`);
				$.ajax({
					async: false,
					url: giphySearchQueryUrl + wordPhraseAltered.replace(/_/g, '+'),
					method: 'GET'
				}).done(function(response2) {
					for (var i = 0, o = gifNumber; i < o; i++) {
						if (response2.data[i] == undefined) {
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
							randomSearchedGif = Math.floor(Math.random() * response2.data.length);
							$(`#${wordPhraseAltered}`).append(`<img class="gif" src="${response2.data[randomSearchedGif].images.fixed_height.url}" src-still="${response2.data[randomSearchedGif].images.fixed_height_still.url}" src-animate="${response2.data[randomSearchedGif].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
							$(`#${wordPhraseAltered}`).append(`<p>Rating: ${response2.data[randomSearchedGif].rating}</p><br>`);
						}
					}		
				});
			}
			else if (col % 6 != 1) {
				$(`#row${row}`).append(`
					<div id="${wordPhraseAltered}" class="${gifColumnClass}">
						<button class="gifButton btn btn-default">${response1.list[0].word}</button>
						<hr>
					</div>
				`);
				$.ajax({
					async: false,
					url: giphySearchQueryUrl + wordPhraseAltered.replace(/_/g, '+'),
					method: 'GET'
				}).done(function(response2) {
					for (var i = 0, o = gifNumber; i < o; i++) {
						if (response2.data[i] == undefined) {
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
							randomSearchedGif = Math.floor(Math.random() * response2.data.length);
							$(`#${wordPhraseAltered}`).append(`<img class="gif" src="${response2.data[randomSearchedGif].images.fixed_height.url}" src-still="${response2.data[randomSearchedGif].images.fixed_height_still.url}" src-animate="${response2.data[randomSearchedGif].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
							$(`#${wordPhraseAltered}`).append(`<p>Rating: ${response2.data[randomSearchedGif].rating}</p><br>`);
						}
					}		
				});
			}
			col++;
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

	gifNumber = parseInt($('#numberOfGifs').val());
	wordPhrase = $('#wordPhraseInput').val().trim()
   	wordPhraseAltered = $('#wordPhraseInput').val().trim().replace(/ /g, '_');

	if (gifNumber >= 1 && gifNumber <= 10) {
		if (wordPhraseAltered.length == 0) {
	    	$('#status').text('Please enter a word/phrase.')
	    	$('#status').show();
	    }
	    else {
	    	if ($('#' + wordPhraseAltered).length) {
				$('#status').text(`You've already searched this word/phrase. Just click its button for more gif's...! =)`);
				$('#status').show();
			}
			else {
				$.ajax({
					url: urbanDefineQueryUrl + wordPhraseAltered.replace(/_/g, '+'),
					method: 'GET'
				}).done(function(response1) {
					if (response1.list.length == 0) {
						$('#status').text('That word/phrase is not in Urban Dictionary!');
						$('#status').show();
					}
					else {
						$('#status').hide();
						if (response1.list[0].word[0] === wordPhrase[0].toLowerCase()) {
							wordPhrase = response1.list[0].word.charAt(0).toUpperCase() + response1.list[0].word.slice(1);
						}
						if (col % 6 == 1) {
							row++;
							$('#gifs').append(`<div id="row${row}" class="row"></div>`);
							$(`#row${row}`).append(`
								<div id="${wordPhraseAltered}" class="${gifColumnClass}">
									<button class="gifButton btn btn-default">${wordPhrase}</button>
									<hr>
								</div>
							`);
							$.ajax({
								async: false,
								url: giphySearchQueryUrl + wordPhraseAltered.replace(/_/g, '+'),
								method: 'GET'
							}).done(function(response2) {
								for (var i = 0, o = gifNumber; i < o; i++) {
									if (response2.data[i] == undefined) {
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
										randomSearchedGif = Math.floor(Math.random() * response2.data.length);
										$(`#${wordPhraseAltered}`).append(`<img class="gif" src="${response2.data[randomSearchedGif].images.fixed_height.url}" src-still="${response2.data[randomSearchedGif].images.fixed_height_still.url}" src-animate="${response2.data[randomSearchedGif].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
										$(`#${wordPhraseAltered}`).append(`<p>Rating: ${response2.data[randomSearchedGif].rating}</p><br>`);
									}
								}	
							});
						}
						else if (col % 6 != 1) {
							$(`#row${row}`).append(`
								<div id="${wordPhraseAltered}" class="${gifColumnClass}">
									<button class="gifButton btn btn-default">${wordPhrase}</button>
									<hr>
								</div>
							`);
							$.ajax({
								async: false,
								url: giphySearchQueryUrl + wordPhraseAltered.replace(/_/g, '+'),
								method: 'GET'
							}).done(function(response2) {
								for (var i = 0, o = gifNumber; i < o; i++) {
									if (response2.data[i] == undefined) {
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
										randomSearchedGif = Math.floor(Math.random() * response2.data.length);
										$(`#${wordPhraseAltered}`).append(`<img class="gif" src="${response2.data[randomSearchedGif].images.fixed_height.url}" src-still="${response2.data[randomSearchedGif].images.fixed_height_still.url}" src-animate="${response2.data[randomSearchedGif].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
										$(`#${wordPhraseAltered}`).append(`<p>Rating: ${response2.data[randomSearchedGif].rating}</p><br>`);
									}
								}	
							});
						}
						col++;
					}
				});
			}
			$('#wordPhraseInput').val('');
		}
	}
	else {
		$('#status').text(`Invalid number of gif's!`);
    	$('#status').show();
	}
});

$(document).on('click', '.gifButton', function() {
	event.preventDefault();

	gifNumber = parseInt($('#numberOfGifs').val());
	wordPhraseAltered = $(this).text().replace(/ /g, '_');

	$('#' + wordPhraseAltered).html(`<button class="gifButton btn btn-default">${wordPhraseAltered.replace(/_/g, ' ')}</button><hr>`);

	if (gifNumber >= 1 && gifNumber <= 10) {
		$('#status').hide();
		$.ajax({
			async: false,
			url: giphySearchQueryUrl + wordPhraseAltered.replace(/_/g, '+') + '&limit=100',
			method: 'GET'
		}).done(function(response1) {
			for (var i = 0, o = gifNumber; i < o; i++) {	
				if (response1.data[i] == undefined) {
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
					randomSearchedGif = Math.floor(Math.random() * response1.data.length);
					$(`#${wordPhraseAltered}`).append(`<img class="gif" src="${response1.data[randomSearchedGif].images.fixed_height.url}" src-still="${response1.data[randomSearchedGif].images.fixed_height_still.url}" src-animate="${response1.data[randomSearchedGif].images.fixed_height.url}" state="animate" alt="Powered by Giphy">`);
					$(`#${wordPhraseAltered}`).append(`<p>Rating: ${response1.data[randomSearchedGif].rating}</p><br>`);
				}
			}	
		});
	}
	else {
		$('#status').text(`Invalid number of gif's!`);
    	$('#status').show();
	}
});