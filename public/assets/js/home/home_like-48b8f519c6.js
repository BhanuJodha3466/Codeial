{const a=t=>{$.ajax({url:t.prop("href"),type:"get",success:e=>{success(e.message),t.siblings(".like-count").text(e.data.likes)},error:e=>{warning(e.responseText)}})},b=function(e){"like"===e.target.classList[1]&&(e.preventDefault(),a($(e.target).parent()))};$(document).click(b)}