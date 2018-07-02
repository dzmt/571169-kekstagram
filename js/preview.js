'use strict';

(function () {
  var utils = window.utils;

  var TAG_NAME_LI = 'li';
  var TAG_NAME_P = 'p';
  var TAG_NAME_IMG = 'img';

  var CLASS_VISIALLY_HIDDEN = 'visually-hidden';
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

  var BIG_PICTURE_CONTAINER = document.querySelector(SELECTOR_BIG_PICTURE_CONTAINER);

  var AVATAR_BEGIN_URL = 'img/avatar-';
  var AVATAR_END_URL = '.svg';

  var createEmptyDocumentFragmentCommentItem = function () {
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
    var avatarIndex = utils.getRandomNumber(6);
    var avatarUrl = AVATAR_BEGIN_URL + avatarIndex + AVATAR_END_URL;
    return avatarUrl;
  };

  var createSocialCommentElements = function (comments) {
    var itemSocialComments = [];
    for (var i = 0; i < comments.length; i++) {
      var dfSocialCommentItem = createEmptyDocumentFragmentCommentItem();
      var avatarUrl = createRandomAvatarUrl();
      fillDFSocialCommentItem(dfSocialCommentItem, avatarUrl, comments[i]);
      itemSocialComments.push(dfSocialCommentItem);
    }
    return itemSocialComments;
  };

  var fillPreview = function (picture) {
    var bigPictureImg = BIG_PICTURE_CONTAINER.querySelector(SELECTOR_BIG_PICTURE);
    var bigPictureLikesCount = BIG_PICTURE_CONTAINER.querySelector(SELECTOR_LIKES_COUNT);
    var bigPictureCommentsCount = BIG_PICTURE_CONTAINER.querySelector(SELECTOR_COMMENTS_COUNT);
    var socialCaption = BIG_PICTURE_CONTAINER.querySelector(SELECTOR_SOCIAL_CAPTION);
    var socialCommentsList = BIG_PICTURE_CONTAINER.querySelector(SELECTOR_SOCIAL_COMMENTS);

    bigPictureImg.src = picture.url;
    bigPictureLikesCount.textContent = picture.likes;
    bigPictureCommentsCount.textContent = picture.comments.length;
    socialCaption.textContent = picture.description;

    utils.removeChildrenElement(socialCommentsList);
    var socialCommentElements = createSocialCommentElements(picture.comments);
    window.fragment.addToElement(socialCommentsList, socialCommentElements);
  };

  utils.addClass(SELECTOR_SOCIAL_COMMENTS_COUNT, CLASS_VISIALLY_HIDDEN);
  utils.addClass(SELECTOR_LOADMORE, CLASS_VISIALLY_HIDDEN);

  window.preview = {
    fill: fillPreview
  };
})();
