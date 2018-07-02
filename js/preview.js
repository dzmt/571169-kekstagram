'use strict';

(function () {

  var TAG_NAME_LI = 'li';
  var TAG_NAME_P = 'p';
  var TAG_NAME_IMG = 'img';

  var CLASS_VISIALLY_HIDDEN = 'visually-hidden';
  var CLASS_SOCIAL_COMMENT = 'social__comment';
  var CLASS_SOCIAL_PICTURE = 'social__picture';
  var CLASS_SOCIAL_TEXT = 'social__text';

  var BIG_PICTURE = document.querySelector(window.enum.SELECTOR.BIG_PICTURE);

  var createEmptyDocumentFragmentCommentItem = function () {
    var liSocialComment = window.utils.createElementWithClass(TAG_NAME_LI, CLASS_SOCIAL_COMMENT);
    var imgSocialPicture = window.utils.createElementWithClass(TAG_NAME_IMG, CLASS_SOCIAL_PICTURE);
    var pSocialText = window.utils.createElementWithClass(TAG_NAME_P, CLASS_SOCIAL_TEXT);

    liSocialComment.appendChild(imgSocialPicture);
    liSocialComment.appendChild(pSocialText);

    var df = document.createDocumentFragment();
    df.appendChild(liSocialComment);
    return df;
  };

  var fillDFSocialCommentItem = function (dfCommentItem, avatarUrl, commentText) {
    var img = dfCommentItem.querySelector(window.enum.SELECTOR.SOCIAL_PICTURE);
    img.src = avatarUrl;

    var p = dfCommentItem.querySelector(window.enum.SELECTOR.SOCIAL_TEXT);
    p.textContent = commentText;
  };

  var createRandomAvatarUrl = function () {
    var avatarIndex = window.utils.getRandomNumber(6);
    var avatarUrl = 'img/avatar-' + avatarIndex + '.svg';
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
    var bigPictureImg = BIG_PICTURE.querySelector(window.enum.SELECTOR.BIG_PICTURE_PICTURE);
    var bigPictureLikesCount = BIG_PICTURE.querySelector(window.enum.SELECTOR.LIKES_COUNT);
    var bigPictureCommentsCount = BIG_PICTURE.querySelector(window.enum.SELECTOR.COMMENTS_COUNT);
    var socialCaption = BIG_PICTURE.querySelector(window.enum.SELECTOR.SOCIAL_CAPTION);
    var socialCommentsList = BIG_PICTURE.querySelector(window.enum.SELECTOR.SOCIAL_COMMENTS);

    bigPictureImg.src = picture.url;
    bigPictureLikesCount.textContent = picture.likes;
    bigPictureCommentsCount.textContent = picture.comments.length;
    socialCaption.textContent = picture.description;

    window.utils.removeChildrenElement(socialCommentsList);
    var socialCommentElements = createSocialCommentElements(picture.comments);
    window.fragment.addToElement(socialCommentsList, socialCommentElements);
  };

  window.utils.addClass(window.enum.SELECTOR.SOCIAL_COMMENTS_COUNT, CLASS_VISIALLY_HIDDEN);
  window.utils.addClass(window.enum.SELECTOR.SOCIAL_LOADMORE, CLASS_VISIALLY_HIDDEN);

  window.preview = {
    fill: fillPreview
  };
})();
