var apiKey='AIzaSyDIqtXf2x_T8N_t1oCMSZqTMnmX_thaIn4';
var channelId='UCtHsCrFQO2P4J1GccUOoBzg'; //channel id

$(document).ready(function(){

	$.get(
		"https://www.googleapis.com/youtube/v3/channels", {
			part:'contentDetails',
			id:channelId,
			key:apiKey },
			function(data) {
				$.each(data.items, function(i,item){
					pid=item.contentDetails.relatedPlaylists.uploads;
					fetchVideo(pid);
				});
			}
	);
	function fetchVideo(pid) {
		$.get(
			"https://www.googleapis.com/youtube/v3/playlistItems", {
				part:'snippet',
				maxResults:500,
				playlistId:pid,
				key:'AIzaSyDIqtXf2x_T8N_t1oCMSZqTMnmX_thaIn4    ' },
				function(data) {
					$.each(data.items, function(i,item){
						var vid_title=item.snippet.title;
						var vid_thumb=item.snippet.thumbnails.medium.url;
						var vid_id=item.snippet.resourceId.videoId;
						var vid_container=$('#videos');
						var videoEle='<div class="video vidEle" data-id="'+vid_id+'">'+
								        '<a href="#top">'+
								          '<img class="v-img" src="'+vid_thumb+'"/>'+
								          '<i class="play-btn fa fa-play"></i>'+
								          '<div class="v-title">'+vid_title+'</div>'+
								        '</a>'+
								      '</div>'
						vid_container.append(videoEle);
					});
				}
		);
	}

 	$(document).on('click','.vidEle',function(){
 		$('#player_vid').attr('src','https://www.youtube.com/embed/'+$(this).data('id')+'?autoplay=1');
 		$('')
 	});
});
