'use strict';

(function () {
  var TAG_NAME_LI = 'li';
  var TAG_NAME_P = 'p';
  var TAG_NAME_IMG = 'img';

  var CLASS_HIDDEN = 'hidden';
  var CLASS_SOCIAL_COMMENT = 'social__comment';
  var CLASS_SOCIAL_PICTURE = 'social__picture';
  var CLASS_SOCIAL_TEXT = 'social__text';

  var SELECTOR_BIG_PICTURE_CONTAINER = '.big-picture';
  var SELECTOR_BIG_PICTURE = '.big-picture__img img';
  var SELECTOR_SOCIAL_PICTURE = '.social__picture';
  var SELECTOR_SOCIAL_TEXT = '.social__text';
  var SELECTOR_SOCIAL_CAPTION = '.social__caption';
  var SELECTOR_LIKES_COUNT = '.likes-count';
  var SELECTOR_COMMENTS_COUNT = '.comments-count';
  var SELECTOR_SOCIAL_COMMENTS = '.social__comments';
  var SELECTOR_SOCIAL_COMMENTS_COUNT = '.social__comment-count';
  var SELECTOR_LOADMORE = '.social__loadmore';

  var AVATAR_BEGIN_URL = 'img/avatar-';
  var AVATAR_END_URL = '.svg';

  var BASE_NEXT_COMMENTS = 5;

  var BIG_PICTURE_CONTAINER = document.querySelector(SELECTOR_BIG_PICTURE_CONTAINER);
  var COMMENTS_CONTAINER = BIG_PICTURE_CONTAINER.querySelector(SELECTOR_SOCIAL_COMMENTS);

  var utils = window.utils;

  var createDocumentFragmentCommentItem = function () {
    var liSocialComment = utils.createElementWithClass(TAG_NAME_LI, CLASS_SOCIAL_COMMENT);
    var imgSocialPicture = utils.createElementWithClass(TAG_NAME_IMG, CLASS_SOCIAL_PICTURE);
    var pSocialText = utils.createElementWithClass(TAG_NAME_P, CLASS_SOCIAL_TEXT);

    liSocialComment.appendChild(imgSocialPicture);
    liSocialComment.appendChild(pSocialText);

    var df = document.createDocumentFragment();
    df.appendChild(liSocialComment);
    return df;
  };

  var fillDFSocialCommentItem = function (dfCommentItem, avatarUrl, commentText) {
    var img = dfCommentItem.querySelector(SELECTOR_SOCIAL_PICTURE);
    img.src = avatarUrl;

    var p = dfCommentItem.querySelector(SELECTOR_SOCIAL_TEXT);
    p.textContent = commentText;
  };

  var createRandomAvatarUrl = function () {
    var avatarIndex = utils.getRandomNumber(6) + 1;
    var avatarUrl = AVATAR_BEGIN_URL + avatarIndex + AVATAR_END_URL;
    return avatarUrl;
  };

  var createSocialCommentElements = function (comments) {
    var commentElements = [];
    comments.forEach(function (comment) {
      var dfSocialCommentItem = createDocumentFragmentCommentItem();
      var avatarUrl = createRandomAvatarUrl();
      fillDFSocialCommentItem(dfSocialCommentItem, avatarUrl, comment);
      commentElements.push(dfSocialCommentItem);
    });
    return commentElements;
  };

  var addCommentsTo = function (element, comments) {
    var socialCommentElements = createSocialCommentElements(comments);
    window.fragment.addToElement(element, socialCommentElements);
  };

  var resetBigPicture = function () {
    var loadMoreButton = document.querySelector(SELECTOR_LOADMORE);

    loadMoreButton.classList.remove(CLASS_HIDDEN);
    utils.removeChildrenElement(COMMENTS_CONTAINER);
  };

  var renderCommentCounter = function (showedCommentCount, fullCommentCount) {
    var bigPictureCommentCount = BIG_PICTURE_CONTAINER.querySelector(SELECTOR_COMMENTS_COUNT);
    var bigPictureShowedCommentCount = BIG_PICTURE_CONTAINER.querySelector(SELECTOR_SOCIAL_COMMENTS_COUNT);

    bigPictureShowedCommentCount.childNodes[0].textContent = showedCommentCount + ' из ';
    bigPictureCommentCount.textContent = fullCommentCount;
  };

  var renderCommentTextAndCounter = function (comments, showedCommentCount, fullCommentsCount) {
    renderCommentCounter(showedCommentCount, fullCommentsCount);
    addCommentsTo(COMMENTS_CONTAINER, comments);
  };

  var renderComments = function (comments) {
    var loadMoreButton = document.querySelector(SELECTOR_LOADMORE);

    var commentsQuantity = comments.length;
    var showedCommentCount = 0;

    if (commentsQuantity <= BASE_NEXT_COMMENTS) {
      showedCommentCount = comments.length;
      loadMoreButton.classList.add(CLASS_HIDDEN);
    } else {
      showedCommentCount = BASE_NEXT_COMMENTS;

      var loadMoreClickHandler = function () {
        var rest = commentsQuantity - showedCommentCount;
        var end = 0;
        var currentRenderComments = [];

        if (rest / BASE_NEXT_COMMENTS > 1) {
          end = showedCommentCount + BASE_NEXT_COMMENTS;
        } else if (rest >= 0) {
          end = showedCommentCount + rest;
          loadMoreButton.classList.add(CLASS_HIDDEN);
          loadMoreButton.removeEventListener(window.enum.EVENT.CLICK, loadMoreClickHandler);
        }

        currentRenderComments = comments.slice(showedCommentCount, end);
        showedCommentCount = end;
        renderCommentTextAndCounter(currentRenderComments, showedCommentCount, commentsQuantity);
      };

      loadMoreButton.addEventListener(window.enum.EVENT.CLICK, loadMoreClickHandler);
    }
    var renderedComments = comments.slice(0, showedCommentCount);
    renderCommentTextAndCounter(renderedComments, showedCommentCount, commentsQuantity);
  };

  var fillPreview = function (picture) {
    var bigPictureImg = BIG_PICTURE_CONTAINER.querySelector(SELECTOR_BIG_PICTURE);
    var bigPictureLikesCount = BIG_PICTURE_CONTAINER.querySelector(SELECTOR_LIKES_COUNT);
    var socialCaption = BIG_PICTURE_CONTAINER.querySelector(SELECTOR_SOCIAL_CAPTION);

    bigPictureImg.src = picture.url;
    bigPictureLikesCount.textContent = picture.likes;
    socialCaption.textContent = picture.description;

    resetBigPicture();
    renderComments(picture.comments);
  };

  window.preview = {
    fill: function (picture) {
      fillPreview(picture);
    }
  };
})();
