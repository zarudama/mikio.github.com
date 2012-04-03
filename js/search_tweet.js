var TOPSY_FKOJI = {};
TOPSY_FKOJI.text = {};
TOPSY_FKOJI.api = {};

/***************************************************************/

/* 表示領域の見出し */
TOPSY_FKOJI.text.header = 'Recent conversation on Twitter';

/* 「すべて表示する」の操作をする箇所のテキスト */
TOPSY_FKOJI.text.more   = 'Show more tweets...';

/* リスト表示の時に取得する件数 */
TOPSY_FKOJI.api.perpage = 100;

/* 表示形式。icon もしくは list を指定する */
//TOPSY_FKOJI.type = 'icon';
TOPSY_FKOJI.type = 'list';

/* リスト表示の時に最初から表示する件数 */
TOPSY_FKOJI.displayNum = 10;

/***************************************************************/

TOPSY_FKOJI.search = function() {
    if (!$('#topsy-tweet-search-results')[0]) {
        return false;
    }

    var url = [
        'http://otter.topsy.com/trackbacks.js?url=',
        encodeURIComponent(location.href),
        '&tracktype=tweet&perpage=',
        TOPSY_FKOJI.api.perpage
    ].join('');
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'jsonp',
        success: function(json, status) {
            if (!json.response.list.length) {
                return false;
            }

            TOPSY_FKOJI.result = json.response.list;
            if (TOPSY_FKOJI.type == 'icon') {
                TOPSY_FKOJI.showIconList();
            }
            else if (TOPSY_FKOJI.type == 'list') {
                TOPSY_FKOJI.showTweetList();
            }
        }
    });
}

TOPSY_FKOJI.showIconList = function() {
    var len = TOPSY_FKOJI.result.length;

    $('#topsy-tweet-search-results').append(
        $('<div class="topsy-tweet-search-results-header"></div>').text(TOPSY_FKOJI.text.header)
    );
    for (var i = 0; i < len; i++) {
        var screenName = TOPSY_FKOJI.result[i].author.url.replace(/http:\/\/twitter.com\//, '');
        var icon = $('<img class="topsy-profile-image-small" style="cursor:pointer;" />')
                    .attr('title', screenName)
                    .attr('src', TOPSY_FKOJI.result[i].author.photo_url)
                    .data('index', i)
                    .click(function() {
                        $('#topsy-tweet-search-results').children('.topsy-tweet-search-result').remove();
                        $('#topsy-tweet-search-results').append(
                            TOPSY_FKOJI.buildTweetDiv($(this).data('index'))
                        );
                    });
        $('#topsy-tweet-search-results').append(icon);
    }
}

TOPSY_FKOJI.showTweetList = function() {
    var len = TOPSY_FKOJI.result.length;

    $('#topsy-tweet-search-results').append(
        $('<div class="topsy-tweet-search-results-header"></div>').text(TOPSY_FKOJI.text.header)
    );
    for (var i = 0; i < len; i++) {
        var tweetDiv = TOPSY_FKOJI.buildTweetDiv(i);
        if (i >= TOPSY_FKOJI.displayNum) {
            tweetDiv.hide();
        }
        $('#topsy-tweet-search-results').append(tweetDiv);
    }
    if (len > TOPSY_FKOJI.displayNum) {
        var more = $('<div id="topsy-show-more-tweets"></div>').click(function() {
            $('#topsy-tweet-search-results').children('.topsy-tweet-search-result').show();
            $(this).hide();
        }).text(TOPSY_FKOJI.text.more);
        $('#topsy-tweet-search-results').append(more);
    }
}

TOPSY_FKOJI.buildTweetDiv = function(index) {
    var result = TOPSY_FKOJI.result[index];
    var screenName = result.author.url.replace(/http:\/\/twitter.com\//, '');
    var d = new Date(result.date * 1000);
    var tweetDiv = $('<div class="topsy-tweet-search-result"></div>');
    var tweetUser = $('<div class="topsy-tweet-image"></div>').append(
        $('<a target="_blank"></a>').attr('href', result.author.url).append(
            $('<img />').attr('src', result.author.photo_url)
        )
    );
    var tweetArea = $('<div class="topsy-tweet-text"></div>');
    var tweetScreenName = $('<a target="_blank" class="topsy-tweet-name"></a>')
                            .attr('href', result.author.url)
                            .text(screenName);
    var tweetContent = $('<span></span>').text(' ' + result.content);
    var tweetLink = $('<span></span>');
    if (result.permalink_url) {
        tweetLink = $('<a target="_blank"></a>').attr('href', result.permalink_url);
    }
    var tweetDate = $('<span class="topsy-tweet-date"></span>').append(
        tweetLink.text([
            d.getFullYear(),
            TOPSY_FKOJI.padZero(d.getMonth() + 1),
            TOPSY_FKOJI.padZero(d.getDate())
        ].join('-') + ' ' +[
            TOPSY_FKOJI.padZero(d.getHours()),
            TOPSY_FKOJI.padZero(d.getMinutes())
        ].join(':'))
    );

    tweetArea.append(tweetScreenName);
    tweetArea.append(tweetContent);
    tweetArea.append($('<br />'));
    tweetArea.append(tweetDate);

    tweetDiv.append(tweetUser);
    tweetDiv.append(tweetArea);

    return tweetDiv;
}

TOPSY_FKOJI.padZero = function(d) {
    return (d < 10) ? '0' + d : d;
}

TOPSY_FKOJI.search();
