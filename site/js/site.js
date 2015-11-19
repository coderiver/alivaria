
// var base_path = '/ipasechny/alivaria';
var base_path = '';

var sounds = {
	1: {src: [base_path + '/audio/1-1.mp3', base_path + '/audio/1-2.mp3'], time: 59},
	2: {src: [base_path + '/audio/2-1.mp3', base_path + '/audio/2-2.mp3'], time: 60},
	3: {src: [base_path + '/audio/3-1.mp3', base_path + '/audio/3-2.mp3'], time: 61},
	4: {src: [base_path + '/audio/4-1.mp3', base_path + '/audio/4-2.mp3'], time: 67}
};

var cliparts = {
	masks: {
		goat: {
			width: 123,
			height: 211,
			x: 613, y: 0,
			src: base_path + '/img/elements/site/service/mask/goat.svg'
		},
		rabbit: {
			width: 74,
			height: 137,
			x: 874, y: 15,
			src: base_path + '/img/elements/site/service/mask/rabbit.svg'
		},
		stork: {
			width: 64,
			height: 171,
			x: 757, y: 115,
			src: base_path + '/img/elements/site/service/mask/stork.svg'
		},
		wolf: {
			width: 103,
			height: 117,
			x: 623, y: 233,
			src: base_path + '/img/elements/site/service/mask/wolf.svg'
		},
		bear: {
			width: 121,
			height: 93,
			x: 850, y: 257,
			src: base_path + '/img/elements/site/service/mask/bear.svg'
		}
	},
	stars: {
		1: {
			width: 136,
			height: 135,
			x: 708, y: 305,
			src: base_path + '/img/elements/site/service/stars/1.svg'
		},
		2: {
			width: 137,
			height: 136,
			x: 708, y: 305,
			src: base_path + '/img/elements/site/service/stars/2.svg'
		},
		3: {
			width: 123,
			height: 129,
			x: 708, y: 305,
			src: base_path + '/img/elements/site/service/stars/3.svg'
		}
	}
};

/*[Function <]*/

/*[Date <]*/
Date.prototype.getUnixTimestamp = function() {
	return Math.round(this.getTime() / 1000);
};
/*[Date >]*/

/*[Math <]*/
var getDecimal = function(num) {
	return +(num % 1).toFixed(10);
};
var getRadians = function(degrees) {
	return degrees * (Math.PI / 180);
};
var getDegrees = function(radians) {
	return radians * (180 / Math.PI);
};
var getAngle = function(Ax, Ay, Bx, By) {
	var x = Ax - Bx;
	var y = Ay - By;
	return Math.atan2(-y, -x);
};
var getDistance = function(Ax, Ay, Bx, By) {
	return Math.sqrt(
		Math.pow((Bx - Ax), 2) + 
		Math.pow((By - Ay), 2)
	);
};
/*[Math >]*/

/*[Load <]*/
var loadImage = function(src, callback) {
	var image = new Image();
	image.onload = function() {
		callback(image);
	};
	image.src = src;
};
var loadImages = function(array, callback) {
	var loaded = 0,
		amount = 0,
		images = {};
	
	for (key in array) {amount++};
	
	for (key in array) {
		images[key] = new Image();
		images[key].onload = function() {
			if (++loaded >= amount) {
				callback(images);
			}
		};
		
		images[key].src = array[key].src || array[key].image;
		images[key].height = array[key].height;
		images[key].width = array[key].width;
	};
};
/*[Load >]*/

/*[Upload <]*/
var xhr = function(url, data, callback) {
	var request = new XMLHttpRequest();
	
	request.onload = function() {
		if (request.readyState == 4 && request.status == 200) {
			callback(request.response);
		};
	};
	
	request.open('POST', url, false);
	request.send(data);
};
/*[Upload >]*/

/*[Function >]*/

$(function() {
	
	/*[Settings <]*/
	soundManager.setup({
		url: base_path + '/js/support/swf/'
	});
	
	conditionizr.config({
		tests: {
			ie9: ['class'],
			ios: ['class'],
			mac: ['class'],
			ie10: ['class'],
			ie11: ['class'],
			touch: ['class'],
			opera: ['class'],
			retina: ['class'],
			safari: ['class'],
			firefox: ['class']
		}
	});
	/*[Settings >]*/
	
	soundManager.onready(function() {
		
		/*[===> RESULT <===]*/
		if ($('.postcard').length) {
			var data = JSON.parse(config);
			
			var stage = new Kinetic.Stage({
				width: 560,
				height: 320,
				container: 'scene'
			});
			
			var scene = new Kinetic.Layer();
						
			/*[Load photo <]*/
			loadImage(data.photo, function(image) {
				
				/*[Create photo <]*/
				var photo = new Kinetic.Image({
					x: 0, y: 0,
					width: 560,
					height: 320,
					image: image,
					name: 'photo'
				}); scene.add(photo).draw();
				/*[Create photo >]*/
				
				/*[Create star <]*/
				if (data.star) {
					loadImage(data.star.src, function(image) {
						var star = new Kinetic.Image({
							name: 'star',
							image: image,
							x: data.star.x,
							y: data.star.y,
							width: data.star.width,
							height: data.star.height,
							offset: {
								x: data.star.offset.x,
								y: data.star.offset.y
							}
						}); scene.add(star).draw();
						
						new TimelineMax({repeat: -1, yoyo:true})
							.to(star, 0.8, {kinetic: {scale: 0.8}, ease: Sine.easeInOut})
							.to(star, 0.8, {kinetic: {scale: 1.0}, ease: Sine.easeInOut})
							.to(star, 1.0, {kinetic: {scale: 0.8}, ease: Sine.easeInOut})
							.to(star, 1.0, {kinetic: {scale: 1.0}, ease: Sine.easeInOut})
							.to(star, 0.8, {kinetic: {scale: 0.8}, ease: Sine.easeInOut})
							.to(star, 0.8, {kinetic: {scale: 1.0}, ease: Sine.easeInOut})
					});
				};
				/*[Create star >]*/
				
				/*[Create mask <]*/
				if (data.mask) {
					loadImages(data.mask, function(images) {
						for (key in images) {
							var mask = new Kinetic.Image({
								name: 'mask',
								image: images[key],
								x: data.mask[key].x,
								y: data.mask[key].y,
								width: data.mask[key].width,
								height: data.mask[key].height,
								offset: {
									x: data.mask[key].offset.x,
									y: data.mask[key].offset.y
								}
							}); scene.add(mask).draw();
										
							var angle = [
								(key % 2 == 0) ?  5 : -5,
								(key % 2 == 0) ? -5 : 5
							];
							
							new TimelineMax({repeat: -1, yoyo:true})
								.to(mask, 1, {kinetic: {rotation: angle[0]}})
								.to(mask, 1, {kinetic: {rotation: angle[1]}})
								.to(mask, 1, {kinetic: {rotation: 0}})
						};
					});
				};
				/*[Create mask >]*/
				
			});
			/*[Load photo >]*/
			
			/*[Create player <]*/
			$(window).load(function() {
				var playSound = function() {
					if (data.is_custom_sound) {
						if (player_sound.loaded && player_music.loaded) {
							player_sound.play();
							player_music.play();
						};
					} else {
						player_sound.play();
					};
					
					$('.postcard .player').addClass('playing');
				};
				
				var stopSound = function() {
					if (data.is_custom_sound) {
						player_sound.stop();
						player_music.stop();
					} else {
						player_sound.stop();
					};
					
					$('.postcard .player').removeClass('playing');
				};
				var player_sound = soundManager.createSound({
					autoLoad: true,
					autoPlay: false,
					url: data.sound,
					id: 'player-sound',
					onload: function() {
						playSound();
					},
					onfinish: function() {
						$('.postcard .player').removeClass('playing');
					}
				});
				
				if (data.is_custom_sound) {
					var player_music = soundManager.createSound({
						autoLoad: true,
						autoPlay: false,
						url: data.music,
						id: 'player-music',
						onload: function() {
							playSound();
						},
						onfinish: function() {
							$('.postcard .player').removeClass('playing');
						}
					});
				};
				
				$('.postcard .player').on('click', function(e) {
					if (!$(this).hasClass('playing')) {
						playSound();
					} else {
						stopSound();
					};
				});
			});
			/*[Create player >]*/
			
			stage.add(scene);
		};
		/*[===> RESULT <===]*/
		
		/*[===> EDITOR <===]*/
		if ($('.editor').length) {
			var resultat = {star: !1, mask: !1, sound: !1, music: !1, photo: !1};
			
			var music_src = !1,
				sound_src = !1,
				photo_src = !1,
				
				mask_on_photo = [],
				star_on_photo = !1,
				
				mask_on_toolbar = [],
				star_on_toolbar = [],
				
				mask_time_lines = [],
				star_time_lines = !1,
				
				record_blob		= !1,
				record_blob_url = !1,
				
				is_custom_sound = !1,
				
				selected_element = !1,
				
				is_allowed_change_star = !1,
				is_allowed_change_mask = !1;
			
			sound_src = sounds[1].src[0];
			music_src = sounds[1].src[1];
			
			/*[===Begin <]*/
			var stage = new Kinetic.Stage({
				width: 990,
				height: 400,
				container: 'scene'
			});
			
			/*[Set stage <]*/
			var setStage = function(step) {
				var stage = (step.toString()).split('.')[0];
				$('nav.progress span[data-stage="'+stage+'"]').addClass('enable active').siblings().removeClass('active disable');
				$('.service .description .item').removeClass('active').filter('[data-stage="'+stage+'"]').addClass('active');
				$('.service .editor .stage[data-step="'+step+'"]').addClass('active').siblings().removeClass('active');
				$('nav.progress span.active').prevAll().addClass('enable').removeClass('disable');
				
				is_allowed_change_star = false;
				is_allowed_change_mask = false;
				
				if (stage == 1) {
					hideStarControls();
					hideStarOnToolbar(star_on_toolbar);
					
					is_allowed_change_mask = true;
					is_allowed_change_star = false;
				};
				
				if (stage == 2) {
					hideMaskControls();
					hideMaskOnToolbar(mask_on_toolbar);
					
					is_allowed_change_star = true;
					is_allowed_change_mask = false;
				};
				
				if (stage == 3 || stage == 4) {
					hideMaskControls();
					hideStarControls();
					hideMaskOnToolbar(mask_on_toolbar);
					hideStarOnToolbar(star_on_toolbar);
				};
			};
							
			$('.service .editor .stage button.next').on('click', function(e) {
				var step = $(this).data('step'); setStage(step);
			});
			/*[Set stage >]*/
			
			/*[Create layer <]*/
			var scene = new Kinetic.Layer();
			var toolbar = new Kinetic.Layer();
			/*[Create layer >]*/
			
			/*[Create areas <]*/
			var photo_area = new Kinetic.Rect({
				width: 562,
				height: 322,
				x: 11, y: 30,
				strokeWidth: 2,
				fill: '#e0e0e0',
				stroke: '#ffffff'
			});	scene.add(photo_area);
			
			var toolbar_area = new Kinetic.Rect({
				width: 420,
				height: 320,
				x: 573, y: 30,
				fill: 'transparent'
			});	scene.add(toolbar_area);
			/*[Create areas >]*/
									
			/*[Create player <]*/
			soundManager.createSound({
				autoLoad: true,
				autoPlay: false,
				id: 'player-sound',
				onfinish: function() {
					$('.service .editor .player').removeClass('playing');
				}
			});
			
			soundManager.createSound({
				autoLoad: true,
				autoPlay: false,
				id: 'player-music',
				onfinish: function() {
					$('.service .editor .player').removeClass('playing');
				}
			});
			
			var player_sound = soundManager.getSoundById('player-sound');
			var player_music = soundManager.getSoundById('player-music');
			
			/*[Play/stop sound <]*/
			var playSound = function() {
				stopSound();
				player_sound.load({url: sound_src}).play();
				$('.service .editor .player').addClass('playing');
			};
			
			var stopSound = function() {
				player_sound.stop();
				$('.service .editor .player').removeClass('playing');
			};
			/*[Play/stop sound >]*/
			
			/*[Play/stop sound set <]*/
			var playSoundSet = function() {
				$('.service .editor .player').addClass('playing');
				player_sound.load({url: record_blob_url});
				player_music.load({url: music_src});
				player_sound.play();
				player_music.play();
			};
			
			var stopSoundSet = function() {
				player_sound.stop();
				player_music.stop();
				$('.service .editor .player').removeClass('playing');
			};
			/*[Play/stop sound set >]*/
			
			$('.service .editor .player').on('click', function(e) {
				if (!$(this).hasClass('playing')) {
					if (is_custom_sound) {
						playSoundSet();
					} else {
						playSound();
					};
					$('.service .editor .player').addClass('playing');
				} else {
					soundManager.stopAll();
					$('.service .editor .player').removeClass('playing');
				};
			});
			/*[Create player >]*/
			
			/*[Create workspace <]*/
			var workspace_x = 12,
				workspace_y = 31,
				workspace_width = 560,
				workspace_height = 320,
				workspace_bound_top = workspace_y,
				workspace_bound_left = workspace_x,
				workspace_bound_right = workspace_x + workspace_width,
				workspace_bound_bottom = workspace_y + workspace_height,
				workspace_aspect_ratio = workspace_height / workspace_width;
			var workspace = new Kinetic.Layer({
				x: workspace_x,
				y: workspace_y,
				clip: {
					x: 0, y: 0,
					width: workspace_width,
					height: workspace_height
				}
			});
			/*[Create workspace >]*/
			
			/*[===Begin >]*/
			
			/*[===Action <]*/
			
			/*[Upload photo <]*/
			$('#file-photo').fileupload({
				dataType: 'json',
				maxFileSize: 10 * 1024 * 1024,
				url: base_path + '/server/uploader/',
				acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
				processalways: function(e, data) {
					if (data.files.error) {
						$.arcticmodal({
							content: 
								'<div class="window message">'+
									'<button class="close"></button>'+
									'<div class="box">'+
										'<div class="title">На жаль, адбылася памылка.</div>'+
										'<p>'+
											'Дадзены фармат файлаў не падтрымліваецца.<br>'+
											'Вы можаце запампаваць любую выяву ў фармаце JPG, PNG ці GIF памерам<br>'+
											'не больш за 10 Мб'+
										'</p>'+
									'</div><!-- [ box ] -->'+
								'</div><!-- [ window ] -->'            
						});
					};
				},
				progressall: function(e, data) {
					var progress = parseInt(data.loaded / data.total * 100, 10);
					$('.service .loader').show();
					$('.service .loader .label').html(progress + '%');
					$('.service .loader .progress').width(progress + '%');
				},
				done: function(e, data) {
					var file = data.result.files[0],
						url = file.url;
					
					if (url) {
						
						/*[Load photo <]*/
						loadImage(url, function(image) {
							$('.form-upload-photo').hide(function() {
								$('.service .loader').fadeOut(function(e) {
									$('.service .loader .label').html('0%');
									$('.service .loader .progress').width('0%');
								});
							});
							
							/*[Create photo <]*/
							var photo_image = image,
								photo_natural_width = photo_image.naturalWidth,
								photo_natural_height = photo_image.naturalHeight,
								photo_natural_aspect_ratio = photo_natural_height / photo_natural_width;
							
							var photo_width  = workspace_width,
								photo_height = photo_width * photo_natural_aspect_ratio;
							
							if (photo_height < workspace_height) {
								photo_height = workspace_height;
								photo_width = (photo_height / photo_natural_height) * photo_natural_width;
							};
							
							var photo_scale_ratio = photo_natural_width / photo_width;
							
							var photo = new Kinetic.Image({
								x: 0, y: 0,
								draggable: true,
								image: photo_image,
								width: photo_width,
								height: photo_height,
								dragBoundFunc: function(position) {
									var y = position.y,
										x = workspace_bound_left;
									
									if (y > workspace_bound_top) {
										y = workspace_bound_top;
									};
									if ((y + photo_height) < workspace_bound_bottom) {
										y = workspace_bound_bottom - photo_height;
									};
									
									return {x: x, y: y}
								}
							});
							/*[Create photo >]*/
							
							/*[Create overlay <]*/
							var overlay = new Kinetic.Rect({
								x: 0, y: 0,
								opacity: .4,
								fill: '#000',
								width: workspace_width,
								height: workspace_height
							});
							/*[Create overlay >]*/
							
							/*[Load small photo <]*/
							loadImage(photo.toDataURL('image/jpeg', 1.0), function(image) {
								workspace.add(photo.x(0)).draw();
								
								/*[Stage photo crop <]*/
								var stagePhotoCrop = function() {
									
									/*[Get result <]*/
									var getResult = function() {
										resultat = {
											star: !1,
											mask: [],
											sound: sound_src,
											music: music_src,
											photo: photo_src,
											is_custom_sound: is_custom_sound
										};
										
										/*[Star <]*/
										if (star_on_photo) {
											resultat.star = {
												x: star_on_photo.x(),
												y: star_on_photo.y(),
												width: star_on_photo.width(),
												height: star_on_photo.height(),
												src: star_on_photo.getImage().attributes.src.value,
												offset: {
													x: star_on_photo.offsetX(),
													y: star_on_photo.offsetY()
												}
											};
										};
										/*[Star >]*/
										
										/*[Mask <]*/
										if (mask_on_photo.length) {
											for (key in mask_on_photo) {
												var mask = mask_on_photo[key].getChildren()[0];
												
												resultat.mask.push({
													x: mask.x(),
													y: mask.y(),
													width: mask.width(),
													height: mask.height(),
													src: mask.getImage().attributes.src.value,
													offset: {
														x: mask.offsetX(),
														y: mask.offsetY()
													}
												});
											};
										};
										/*[Mask >]*/
										
										return JSON.stringify(resultat);
									};
									/*[Get result >]*/
							
									/*[Save picture <]*/
									var savePicture = function() {
										workspace.setAttrs({x: 0, y: 0});
										
										var name = new Date().getUnixTimestamp() + '.png',
											photo = workspace.find('.photography')[0].toDataURL({
												width: 560,
												height: 320,
												mimeType: "image/png"
											}),
											collage = workspace.toDataURL({
												width: 560,
												height: 320,
												mimeType: "image/png"
											});
										
										photo_src = '/files/photo/' + name;
										
										workspace.setAttrs({x: workspace_x, y: workspace_y});
										
										$.ajax({
											type: 'POST',
											dataType: 'json',
											data: {
												name: name,
												photo: photo,
												collage: collage,
												config: getResult()
											},
											url: base_path + '/server/savephoto.php'
										});
									};
									/*[Save picture <]*/
									
									/*[Stage buttons <]*/
									$('.stage[data-step="1.1"] button.next').on('click', function(e) {
										photoFrameSave();
										activeMaskOnToolbar(mask_on_toolbar);
									});
									$('.stage[data-step="1.2"] button.next').on('click', function(e) {
										hideMaskControls();
										hideMaskOnToolbar(mask_on_toolbar);
									});
									$('.stage[data-step="2.0"] button.next').on('click', function(e) {
										hideStarControls();
										hideStarOnToolbar(star_on_toolbar);
									});
									$('.stage[data-step="3.0"] button.next').on('click', function(e) {
										savePicture();
										animateClipart();
										soundManager.stopAll();
										$('.service .editor .player').show();
										if (is_custom_sound) {
											playSoundSet();
										} else {
											playSound();
										};
									});
									/*[Stage buttons >]*/
									
									/*[Create operate frame <]*/
									var frame_group = new Kinetic.Group({
										x: 0, y: 0,
										draggable: true,
										width: workspace_width,
										height: workspace_height,
										dragBoundFunc: function(position) {
											var x = position.x,
												y = position.y;
											
											if (y + anchor_tl.y() <= workspace_bound_top) {
												y = workspace_bound_top - anchor_tl.y();
											};
											if (x + anchor_tl.x() <= workspace_bound_left) {
												x = workspace_bound_left - anchor_tl.x();
											};
											if ((x + anchor_tl.x() + photo_operate_frame.width()) >= workspace_bound_right) {
												x = workspace_bound_right - photo_operate_frame.width() - anchor_tl.x()
											};
											if ((y + anchor_tl.y() + photo_operate_frame.height()) >= workspace_bound_bottom) {
												y = workspace_bound_bottom - photo_operate_frame.height() - anchor_tl.y()
											};
											
											photo_operate_frame.crop({
												x: ((x + anchor_tl.x()) - workspace_x),
												y: ((y + anchor_tl.y()) - workspace_y) - photo.y()
											});
											
											photoFrameFind();
											
											return {x: x, y: y};
										}
									});
									
									/*[Frame <]*/
									var frame_width  = Math.round(workspace_width - 30),
										frame_height = Math.round(frame_width * workspace_aspect_ratio),
										frame_x = Math.round((workspace_width / 2) - (frame_width / 2)),
										frame_y = Math.round((workspace_height / 2) - (frame_height / 2));
									var photo_operate_frame = new Kinetic.Image({
										x: frame_x,
										y: frame_y,
										image: image,
										stroke: '#fff',
										strokeWidth: 2,
										width: frame_width,
										height: frame_height,
										crop: {
											x: frame_x,
											width: frame_width,
											height: frame_height,
											y: frame_y - photo.y()
										}
									}); frame_group.add(photo_operate_frame);
									
									photo_operate_frame.on('dragend mouseout touchend', function() {
										$('body').removeAttr('style');
									});
									
									photo_operate_frame.on('dragmove mouseover touchstart', function() {
										if (photo_operate_frame.width() < workspace_width || photo_operate_frame.height() < workspace_height) {
											document.body.style.cursor = 'move';
										};
									});
									
									var frameSetSize = function(A, B, direction) {
										var Ax, Ay, Bx, By, width, height, diagonal;
										
										Ax = A.x(); Ay = A.y(); Bx = B.x(); By = B.y();
										
										diagonal = getDistance(Ax, Ay, Bx, By);
										
										width = 
											Math.round(
												Math.sqrt(
													Math.pow(diagonal, 2) / 
													(1 + Math.pow(workspace_aspect_ratio, 2))
												)
											);
										
										width = (width > 200) ? width : 200;
										
										/*[Correction width <]*/
										var frame_x = frame_group.getAbsolutePosition().x,
											frame_y = frame_group.getAbsolutePosition().y,
											
											frame_point_tl_x = (frame_x + anchor_tl.x()),
											frame_point_tl_y = (frame_y + anchor_tl.y()),
										
											frame_point_tr_x = (frame_x + anchor_tr.x()),
											frame_point_tr_y = (frame_y + anchor_tr.y()),
											
											frame_point_bl_x = (frame_x + anchor_bl.x()),
											frame_point_bl_y = (frame_y + anchor_bl.y()),
											
											frame_point_br_x = (frame_x + anchor_br.x()),
											frame_point_br_y = (frame_y + anchor_br.y());
											
											is_bound_top = frame_point_tl_y <= workspace_bound_top || frame_point_tr_y <= workspace_bound_top,
											is_bound_left = frame_point_tl_x <= workspace_bound_left || frame_point_bl_x <= workspace_bound_left,
											is_bound_right = frame_point_tr_x >= workspace_bound_right || frame_point_br_x >= workspace_bound_right,
											is_bound_bottom = frame_point_bl_y >= workspace_bound_bottom || frame_point_br_y >= workspace_bound_bottom;
										
										var setWidthLimit = function() {
											if (width > photo_operate_frame.width()) {
												width = photo_operate_frame.width();
											};
										};
										
										if (direction == 'tl-br') {
											if (is_bound_right && is_bound_bottom) {
												width = (width <= workspace_width) ? width : workspace_width;
											} else if (is_bound_top || is_bound_left) {setWidthLimit()};
										};
										if (direction == 'tr-bl') {
											if (is_bound_left && is_bound_bottom) {
												width = (width <= workspace_width) ? width : workspace_width;
											} else if (is_bound_top || is_bound_right) {setWidthLimit()};
										};
										if (direction == 'bl-tr') {
											if (is_bound_top && is_bound_right) {
												width = (width <= workspace_width) ? width : workspace_width;
											} else if (is_bound_left || is_bound_bottom) {setWidthLimit()};
										};
										if (direction == 'br-tl') {
											if (is_bound_top && is_bound_left) {
												width = (width <= workspace_width) ? width : workspace_width;
											} else if (is_bound_right || is_bound_bottom) {setWidthLimit()};
										};
										/*[Correction width >]*/
										
										height = Math.round(workspace_aspect_ratio * width);
										
										photo_operate_frame.setAttrs({
											width: width,
											height: height,
											crop: {
												width: width,
												height: height
											}
										});
										
										anchor_tl_x = photo_operate_frame.x();
										anchor_tl_y = photo_operate_frame.y();
										
										anchor_tr_x = anchor_tl_x + photo_operate_frame.width();
										anchor_tr_y = anchor_tl_y;
										
										anchor_bl_x = anchor_tl_x;
										anchor_bl_y = anchor_tl_y + photo_operate_frame.height();
										
										anchor_br_x = anchor_tr_x;
										anchor_br_y = anchor_bl_y;
										
										if (direction == 'tl-br') {
											photo_operate_frame.setAttrs({
												x: anchor_br.x() - width,
												y: anchor_br.y() - height
											});
										};
										if (direction == 'tr-bl') {
											photo_operate_frame.setAttrs({
												x: anchor_bl.x(),
												y: anchor_bl.y() - height
											});
										};
										if (direction == 'bl-tr') {
											photo_operate_frame.setAttrs({
												x: anchor_tr.x() - width,
												y: anchor_tr.y()
											});
										};
										if (direction == 'br-tl') {
											photo_operate_frame.setAttrs({
												x: anchor_tl.x(),
												y: anchor_tl.y()
											});
										};
										
										anchorSetPosition();
										photoFrameFind();
										
										photo_operate_frame.crop({
											x: ((frame_group.getAbsolutePosition().x + anchor_tl.x()) - workspace_x),
											y: ((frame_group.getAbsolutePosition().y + anchor_tl.y()) - workspace_y) - photo.y()
										});
									};
									/*[Frame >]*/
									
									/*[Anchor <]*/
									var anchor_options = {
										width: 10,
										height: 10,
										fill: '#fff',
										draggable: true,
										offset: {x: 5, y: 5}
									};
									
									var anchor_tl = new Kinetic.Rect(anchor_options); frame_group.add(anchor_tl);
									var anchor_tr = new Kinetic.Rect(anchor_options); frame_group.add(anchor_tr);
									var anchor_bl = new Kinetic.Rect(anchor_options); frame_group.add(anchor_bl);
									var anchor_br = new Kinetic.Rect(anchor_options); frame_group.add(anchor_br);
									
									anchor_tl.on('dragmove', function(position) {frameSetSize(anchor_tl, anchor_br, 'tl-br')});
									anchor_tr.on('dragmove', function(position) {frameSetSize(anchor_tr, anchor_bl, 'tr-bl')});
									anchor_bl.on('dragmove', function(position) {frameSetSize(anchor_bl, anchor_tr, 'bl-tr')});
									anchor_br.on('dragmove', function(position) {frameSetSize(anchor_br, anchor_tl, 'br-tl')});
									
									anchor_tl.on('dragend mouseout touchend', function() {$('body').removeAttr('style');});
									anchor_tr.on('dragend mouseout touchend', function() {$('body').removeAttr('style');});
									anchor_br.on('dragend mouseout touchend', function() {$('body').removeAttr('style');});
									anchor_bl.on('dragend mouseout touchend', function() {$('body').removeAttr('style');});
									
									anchor_tl.on('dragmove mouseover touchstart', function() {document.body.style.cursor = 'nw-resize';});
									anchor_tr.on('dragmove mouseover touchstart', function() {document.body.style.cursor = 'ne-resize';});
									anchor_br.on('dragmove mouseover touchstart', function() {document.body.style.cursor = 'nw-resize';});
									anchor_bl.on('dragmove mouseover touchstart', function() {document.body.style.cursor = 'ne-resize';});
									
									var anchorSetPosition = function() {
										anchor_tl_x = photo_operate_frame.x();
										anchor_tl_y = photo_operate_frame.y();
										
										anchor_tr_x = anchor_tl_x + photo_operate_frame.width();
										anchor_tr_y = anchor_tl_y;
										
										anchor_bl_x = anchor_tl_x;
										anchor_bl_y = anchor_tl_y + photo_operate_frame.height();
										
										anchor_br_x = anchor_tr_x;
										anchor_br_y = anchor_bl_y;
										
										anchor_tl.setAttrs({x: anchor_tl_x, y: anchor_tl_y});
										anchor_tr.setAttrs({x: anchor_tr_x, y: anchor_tr_y});
										anchor_bl.setAttrs({x: anchor_bl_x, y: anchor_bl_y});
										anchor_br.setAttrs({x: anchor_br_x, y: anchor_br_y});
									}; anchorSetPosition();
									/*[Anchor >]*/
									
									/*[Create operate frame >]*/
									
									/*[Create natural frame <]*/
									var photo_natural_frame = new Kinetic.Image({
										x: 0, y: 0,
										stroke: '#fff',
										visible: false,
										strokeWidth: 2,
										image: photo_image,
										width: workspace_width,
										height: workspace_height
									});
									
									var photoFrameFind = function() {
										var width = photo_operate_frame.width() * photo_scale_ratio,
											height = photo_operate_frame.height() * photo_scale_ratio,
											x = ((frame_group.x() + anchor_tl.x()) * photo_scale_ratio),
											y = (((frame_group.y() + anchor_tl.y()) + (photo.y() * -1)) * photo_scale_ratio);
										
										photo_natural_frame.setAttrs({
											crop: {
												x: x, y: y,
												width: width,
												height: height
											}
										});
									}; photoFrameFind();
									
									var photoFrameSave = function() {
										photo_natural_frame.visible(true);
										var src = photo_natural_frame.toDataURL({
											quality: 1,
											x: workspace_x,
											y: workspace_y,
											mimeType: "image/png",
											width: workspace_width,
											height: workspace_height
										});
										
										loadImage(src, function(crop) {
											photo.destroy();
											photo_natural_frame.destroy();
											photo_operate_frame.destroy();
											
											var photography = new Kinetic.Image({
												x: 0, y: 0,
												image: crop,
												name: 'photography',
												width: workspace_width,
												height: workspace_height
											}).on('click dragstart touchstart', function() {
												hideMaskControls();
												hideStarControls();
											});
											
											workspace.add(photography);
											workspace.draw();
										});
									};
									/*[Create natural frame >]*/
									
									workspace.add(overlay)
											 .add(frame_group)
											 .add(photo_natural_frame).draw();
									
								};
								/*[Stage photo crop >]*/
								
								if (photo.height() == workspace_height) {
									setStage('1.1');
									stagePhotoCrop();
								} else {
									setStage('1.0');
									photo.on('dragend mouseout touchend', function() {$('body').removeAttr('style')});
									photo.on('dragmove mouseover touchstart', function() {document.body.style.cursor = 'n-resize'});
								};
								
								$('.stage[data-step="1.0"] button.next').on('click', function(e) {
									stagePhotoCrop();
								});
							});
							/*[Load small photo <]*/
							
						});
						/*[Load photo >]*/
						
					} else {
						$.arcticmodal({
							content: 
								'<div class="window message">'+
									'<button class="close"></button>'+
									'<div class="box">'+
										'<div class="title">На жаль, адбылася памылка.</div>'+
										'<p>Паспрабуйце паўтарыць спробу запампоўкі.</p>'+
									'</div><!-- [ box ] -->'+
								'</div><!-- [ window ] -->'            
						});
					};
				}
			});
			
			$('.form-upload-photo button.upload').on('click', function() {
				$('#file-photo').trigger('click');
			});
			/*[Upload photo >]*/
		
			/*[Load clipart <]*/
			loadImages(cliparts.masks, function(images) {
				addMasksOnToolbar(cliparts.masks, mask_on_toolbar, images);
			});
			
			loadImages(cliparts.stars, function(images) {
				addStarsOnToolbar(cliparts.stars, star_on_toolbar, images);
			});
			/*[Load clipart >]*/
		
			/*[Animate clipart <]*/
			var animateClipart = function() {
				
				/*[Star animate <]*/
				if (star_on_photo) {
					mask_time_lines.push(
						new TimelineMax({repeat: -1, yoyo:true})
							.to(star_on_photo, 0.8, {kinetic: {scale: 0.8}, ease: Sine.easeInOut})
							.to(star_on_photo, 0.8, {kinetic: {scale: 1.0}, ease: Sine.easeInOut})
							.to(star_on_photo, 1.0, {kinetic: {scale: 0.8}, ease: Sine.easeInOut})
							.to(star_on_photo, 1.0, {kinetic: {scale: 1.0}, ease: Sine.easeInOut})
							.to(star_on_photo, 0.8, {kinetic: {scale: 0.8}, ease: Sine.easeInOut})
							.to(star_on_photo, 0.8, {kinetic: {scale: 1.0}, ease: Sine.easeInOut})
					);
				};
				/*[Star animate >]*/
				
				/*[Mask animate <]*/
				for (key in mask_on_photo) {
					var angle = [
						(key % 2 == 0) ? '+=5' : '-=5',
						(key % 2 == 0) ? '-=5' : '+=5'
					];
					
					var node = mask_on_photo[key].getChildren(function(node) {
					   return node.getClassName() === 'Image';
					});
					
					mask_time_lines.push(
						new TimelineMax({repeat: -1, yoyo:true})
							.to(node, 1, {kinetic: {rotation: angle[0]}})
							.to(node, 1, {kinetic: {rotation: angle[1]}})
					);
				};
				/*[Mask animate >]*/
				
			};
			/*[Animate clipart >]*/
			
			/*[Star functions <]*/
			
			/*[Add stars on toolbar <]*/
			var addStarsOnToolbar = function(data, array, images) {
				for (key in images) {
					var width = data[key].width,
						height = data[key].height,
						x = data[key].x - (width / 2),
						y = data[key].y - (height / 2);
					
					var star = new Kinetic.Group({
						opacity: 0,
						visible: false,
						name: 'star_'+key
					}); workspace.add(star);
					
					var image = new Kinetic.Image({
						x: x, y: y,
						width: width,
						height: height,
						image: images[key],
						name: 'star_image'
					}).on('mouseover mouseenter touchstart', function() {
						document.body.style.cursor = 'pointer';
					}).on('mouseout touchend', function() {
						$('body').removeAttr('style');
					});
					
					var outline = new Kinetic.Image({
						x: x, y: y,
						grayscale: 0,
						width: width,
						height: height,
						image: images[key],
						name: 'star_outline',
						filters: [Kinetic.Filters.Grayscale]
					});
					
					image.on('dragend mouseout touchend', function() {
						var $this = this;
						
						if ($this.getAbsolutePosition().x + $this.attrs.image.width > workspace_width) {
							TweenMax.to($this, .2, {
								kinetic: {
									x: $this.getParent().children[0].x(),
									y: $this.getParent().children[0].y()
								}
							});
						} else {
							var width = $this.width(),
								height = $this.height(),
								width_half = width / 2,
								height_half = height / 2,
								x = ($this.getAbsolutePosition().x - workspace_x) + width_half,
								y = ($this.getAbsolutePosition().y - workspace_y) + height_half;
							
							var star = new Kinetic.Image({
								x: x, y: y,
								name: 'star',
								strokeWidth: 2,
								dash: [4, 4, 4],
								draggable: true,
								width: $this.width(),
								stroke: 'transparent',
								height: $this.height(),
								image: $this.attrs.image,
								group: $this.getParent().name(),
								offset: {
									x: width_half,
									y: height_half
								}
							}).on('mouseover mouseenter touchstart', function() {
								if (is_allowed_change_star) {
									this.draggable(true);
									document.body.style.cursor = 'pointer';
								} else {
									this.draggable(false);
								};
							}).on('click dragstart touchstart', function() {
								showStarControls(this)
							}).on('mouseout touchend', function() {
								$('body').removeAttr('style');
							});
							
							$this.setAttrs({
								opacity: 0,
								visible: false,
								draggable: false,
								x: outline.attrs.x,
								y: outline.attrs.y
							});
							workspace.add(star).draw();
							star_on_photo = star;
							toolbar.draw();
						};
					});
					
					outline.cache().drawHitFromCache();
					star.add(outline).add(image);
					toolbar.add(star).draw();
					array.push(star);
				};
			};
			/*[Add stars on toolbar >]*/
			
			/*[Show/hide star controls <]*/
			var showStarControls = function(element) {
				if (is_allowed_change_star) {
					hideMaskControls();
					$('.service .editor button.remove').show();
					selected_element = element;
					element.stroke('#fff');
					workspace.draw();
				};
			};
			var hideStarControls = function() {
				if (star_on_photo) {
					$('.service .editor button.remove').hide();
					star_on_photo.stroke('transparent');
					selected_element = false;
					workspace.draw();
				};
			};
			/*[Show/hide star controls >]*/
			
			/*[Show/hide star on toolbar <]*/
			var showStarOnToolbar = function() {
				var type = $('.service .star:radio:checked').val(),
					star = toolbar.find('.star_'+type)[0];
				
				star.setAttrs({
					opacity: 1,
					visible: true
				});
				
				if (!star_on_photo) {
					star.getChildren()[1].setAttrs({
						opacity: 1,
						visible: true,
						draggable: true
					});
				};
				
				toolbar.draw();
			};
			var hideStarOnToolbar = function(array) {
				for (key in array) {
					array[key].hide();
				}; toolbar.draw();
			};
			/*[Show/hide star on toolbar >]*/
			
			/*[Show select star on toolbar <]*/
			var showSelectStarOnToolbar = function(type) {
				var star = toolbar.find('.star_'+type);
				
				if (star_on_photo) {
					star_on_photo.destroy();
					star_on_photo = !1;
				};
				
				for (key in star_on_toolbar) {
					star_on_toolbar[key].opacity(0);
					star_on_toolbar[key].getChildren()[1].setAttrs({
						opacity: 0,
						visible: false,
						draggable: false
					});
				};
				
				star[0].getChildren()[1].setAttrs({
					opacity: 1,
					visible: true,
					draggable: true
				});
				
				star.setAttrs({
					opacity: 1,
					visible: true
				}).moveToTop();
				
				workspace.draw();
				toolbar.draw();
			};
			/*[Show select star on toolbar >]*/
			
			/*[Star functions >]*/
			
			/*[Mask functions <]*/
			
			/*[Add mask on photo <]*/
			var addMaskOnPhoto = function(data) {
				var name = data.attrs.name,
					image = data.attrs.image,
					width = cliparts.masks[name]['width'],
					height = cliparts.masks[name]['height'],
					half_width = width / 2,
					half_height = height / 2,
					x = (data.attrs.x - workspace_x) + half_width,
					y = (data.attrs.y - workspace_y) + half_height;
				
				/*[Create mask group <]*/
				var mask = new Kinetic.Group({
					name: 'mask',
					draggable: true
				}).on('mouseover mouseenter touchstart', function() {
					if (is_allowed_change_mask) {
						this.draggable(true);
						document.body.style.cursor = 'pointer';
					} else {
						this.draggable(false);
					};
				}).on('mouseout touchend', function() {
					$('body').removeAttr('style');
				}); workspace.add(mask);
				
				var image = new Kinetic.Image({
					x: x, y: y,
					type: name,
					image: image,
					width: width,
					height: height,
					strokeWidth: 2,
					dash: [4, 4, 4],
					name: 'mask-image',
					stroke: 'transparent',
					offset: {
						x: half_width,
						y: half_height
					}
				});	mask.add(image);
				
				var control = new Kinetic.Circle({
					radius: 7,
					fill: '#fff',
					stroke: '#000',
					visible: false,
					strokeWidth: 1,
					draggable: true,
					x: x + half_width,
					y: y - half_height,
					name: 'mask-control'
				});	mask.add(control);
				/*[Create mask group >]*/
				
				/*[Event processing >]*/
				setSizeAndAngleMask('on', image, control);
				mask.on('click dragstart touchstart', function() {
					showMaskControls(this);
				});
				control.on('dragstart dragmove touchstart', function() {
					setSizeAndAngleMask('off', image, control);
				});
				/*[Event processing >]*/
				
				mask_on_photo.push(mask);
				workspace.add(mask);
				hideMaskControls();
				workspace.draw();
			};
			/*[Add mask on photo >]*/
			
			/*[Add masks on toolbar <]*/
			var addMasksOnToolbar = function(data, array, images) {
				for (key in images) {
					var clipart = new Kinetic.Image({
						type: key,
						opacity: .8,
						grayscale: 0,
						x: data[key].x,
						y: data[key].y,
						image: images[key],
						width: data[key].width,
						height: data[key].height,
						name: 'clipart-on-toolbar',
						filters: [Kinetic.Filters.Grayscale]
					});
					
					clipart.cache().drawHitFromCache();
					toolbar.add(clipart).draw();
					array.push(clipart);
				};
			};
			/*[Add masks on toolbar >]*/
			
			/*[Active mask on toolbar <]*/
			var active_mask_in_toolbar = [];
			var activeMaskOnToolbar = function(array) {
				for (key in array) {
					var item = array[key];
					
					item.setAttrs({
						opacity: 1,
						grayscale: 1
					}).cache().drawHitFromCache();
					
					var mask = new Kinetic.Image({
						draggable: true,
						x: item.attrs.x,
						y: item.attrs.y,
						name: item.attrs.type,
						image: item.attrs.image,
						width: item.attrs.width,
						height: item.attrs.height
					}).on('mouseover mouseenter touchstart', function() {
						document.body.style.cursor = 'pointer';
					}).on('mouseout touchend', function() {
						$('body').removeAttr('style');
					});
					
					mask.on('dragend touchend', function() {
						var $this = this, name = $this.attrs.name;
						if ($this.attrs.x + $this.attrs.image.width <= workspace_width) {
							addMaskOnPhoto($this);
							$this.setAttrs({
								x: cliparts.masks[name].x,
								y: cliparts.masks[name].y
							}); toolbar.draw();
						};
					});
					
					mask.on('dragend mouseout touchend', function() {
						var $this = this, name = $this.attrs.name;
						if ($this.attrs.x + $this.attrs.image.width > workspace_width) {
							TweenMax.to($this, .2, {
								kinetic: {
									x: cliparts.masks[name].x,
									y: cliparts.masks[name].y
								}
							}); toolbar.draw();
						};
					});
					
					toolbar.add(mask).draw();
					active_mask_in_toolbar.push(mask);
				};
			};
			/*[Active mask on toolbar >]*/
			
			/*[Show/hide mask controls <]*/
			var showMaskControls = function(clipart) {
				if (is_allowed_change_mask) {
					hideStarControls();
					hideMaskControls();
					selected_element = clipart;
					clipart.children[1].show();
					clipart.children[0].stroke('#fff');
					$('.service .editor button.remove').show();
					workspace.draw();
				};
			};
			var hideMaskControls = function() {
				for (key in mask_on_photo) {
					if (mask_on_photo[key].children.length) {
						mask_on_photo[key].children[1].hide();
						mask_on_photo[key].children[0].stroke('transparent');
					} else {
						delete mask_on_photo[key];
					}
				};
				$('.service .editor button.remove').hide();
				selected_element = false;
				workspace.draw();
			};
			/*[Show/hide mask controls >]*/
			
			/*[Set size and angle mask <]*/
			var setSizeAndAngleMask = function(start, picture, control) {
				var Ax, Ay, Bx, By, angle, width, height, radius,
					picture_name = picture.attrs.type,
					picture_width = cliparts.masks[picture_name]['width'],
					picture_height = cliparts.masks[picture_name]['height'],
					picture_aspect_ratio = picture_height / picture_width;
				
				Ax = picture.getPosition().x; Bx = control.getPosition().x;
				Ay = picture.getPosition().y; By = control.getPosition().y;
				
				radius = getDistance(Ax, Ay, Bx, By);
				angle  = getDegrees(getAngle(Ax, Ay, Bx, By));
				
				width = 
					Math.sqrt(
						Math.pow(radius, 2) / 
						(1 + Math.pow(picture_aspect_ratio, 2))
					) * 2;
				
				height = picture_aspect_ratio * width;
				
				picture.setAttrs({
					width: width,
					height: height,
					rotation: angle,
					offsetX: width / 2,
					offsetY: height / 2,
				});
				
				if (start == 'on') {
					angle_correction = angle * -1;
					picture.rotate(angle_correction);
				} else {
					picture.rotate(angle_correction);
				};
			};
			/*[Set size and angle mask >]*/
			
			/*[Show/hide mask on toolbar <]*/
			var showMaskOnToolbar = function(array) {
				for (key in array) {
					array[key].show();
					active_mask_in_toolbar[key].show();
				}; toolbar.draw();
			};
			var hideMaskOnToolbar = function(array) {
				for (key in array) {
					array[key].hide();
					active_mask_in_toolbar[key].hide();
				}; toolbar.draw();
			};
			/*[Show/hide mask on toolbar >]*/
			
			/*[Mask functions >]*/
			
			/*[Create custom song <]*/
			navigator.getUserMedia = 
				navigator.getUserMedia || 
				navigator.webkitGetUserMedia || 
				navigator.mozGetUserMedia || 
				navigator.msGetUserMedia;
			
			window.URL.createObjectURL = 
				window.URL.createObjectURL || 
				window.URL.webkitCreateObjectURL || 
				window.URL.mozCreateObjectURL || 
				window.URL.msCreateObjectURL;
			
			if (navigator.getUserMedia) {
				
				/*[Sound recording <]*/
				navigator.getUserMedia({
					audio: true
				}, function(stream) {
					
					/*[Create player <]*/
					soundManager.createSound({
						autoLoad: true,
						autoPlay: false,
						multiShot: true,
						multiShotEvents: true,
						id: 'player-custom-sound'
					});
					
					var player_custom_music = soundManager.getSoundById('player-custom-music');
					var player_custom_sound = soundManager.getSoundById('player-custom-sound');
					/*[Create player >]*/
					
					/*[Recording audio <]*/
					var audioRecord,
						timeoutRecordingAudio;
					var startRecordingAudio = function(stream) {
						$('.soundtrack .creation .step').filter('._1, ._3').removeClass('active');
						$('.soundtrack .creation .music-player').addClass('active');
						$('.soundtrack .creation .step._2').addClass('active');
						
						player_custom_music.stop();
						player_custom_sound.stop();
						
						var index = $('.songs-list :radio:checked').val(),
							sound_duration = sounds[index].time * 1000;
						
						audioRecord = RecordRTC(stream);
						audioRecord.startRecording();
						
						player_custom_music.load({
							url: music_src
						}).play();
						
						clearTimeout(timeoutRecordingAudio);
						timeoutRecordingAudio = setTimeout(function(e) {
							audioRecord.stopRecording(function(url) {
								$('.soundtrack .creation .step').removeClass('active');
								$('.soundtrack .creation .step._3').addClass('active');
								
								player_custom_music.stop();
								player_custom_sound.stop();
								soundManager.stopAll();
								
								record_blob 	= audioRecord.getBlob();
								record_blob_url = url;
							});
						}, sound_duration);
					};
					/*[Recording audio >]*/
					
					/*[Creation buttons <]*/
					
					/*[Save <]*/
					$('.soundtrack .creation button.save').on('click', function(e) {
						player_custom_music.stop();
						player_custom_sound.stop();
						
						var ext = (conditionizr.firefox) ? '.ogg': '.wav',
							name = new Date().getUnixTimestamp() + ext;
						
						sound_src = '/files/sound/' + name;
						
						var reader = new FileReader();
						
						reader.onload = function(event) {
							$.ajax({
								async: true,
								type: 'POST',
								dataType: 'json',
								data: {
									name: name,
									file: event.target.result
								},
								url: base_path + '/server/savesound.php',
								beforeSend: function() {
									TweenMax.to('#preloader', .6, {opacity: 1, display: 'table'});
								},
								success: function() {
									is_custom_sound = true;
									$('button.create-song').hide();
									$('.popup .window button.close').trigger('click');
									TweenMax.to('#preloader', .6, {opacity: 0, display: 'none'});
									$('.service .songs-list .item.custom').show().find('a').attr('href', sound_src);
								},
								error: function(data) {
									console.log(data)
									TweenMax.to('#preloader', .6, {opacity: 0, display: 'none'});
									$.arcticmodal({
										content: 
											'<div class="window message">'+
												'<button class="close"></button>'+
												'<div class="box">'+
													'<div class="title">На жаль, адбылася памылка.</div>'+
													'<p>Паспрабуйце паўтарыць спробу захаваць запіс.</p>'+
												'</div><!-- [ box ] -->'+
											'</div><!-- [ window ] -->'            
									});
								}
							});
						};
						
						reader.readAsDataURL(record_blob);
					});
					/*[Save >]*/
					
					/*[Cancel <]*/
					$('.soundtrack .creation button.cancel').on('click', function(e) {
						$('.soundtrack .creation .music-player').removeClass('active');
						$('.soundtrack .creation .step').removeClass('active');
						$('.soundtrack .creation .step._1').addClass('active');
						clearTimeout(timeoutRecordingAudio);
						audioRecord.stopRecording();
						player_custom_music.stop();
					});
					/*[Cancel >]*/
					
					/*[Start & again <]*/
					$('.soundtrack .creation button').filter('.start, .again').on('click', function(e) {
						startRecordingAudio(stream);
					});
					/*[Start & again >]*/
					
					/*[Creation buttons >]*/
					
					/*[Music player buttons >]*/
					
					/*[Play <]*/
					$(document).on('click', '.music-player button.play', function(e) {
						player_custom_sound.load({
							url: record_blob_url
						});
						
						player_custom_music.load({
							url: music_src,
							onload: function() {
								player_custom_sound.play();
								player_custom_music.play();
							}
						});
					});
					/*[Play >]*/
					
					/*[Stop <]*/
					$(document).on('click', '.music-player button.stop', function(e) {
						player_custom_music.stop();
						player_custom_sound.stop();
					});
					/*[Stop >]*/
					
					/*[Music player buttons >]*/
					
					$(document).on('click', '.service .songs-list .item.custom .player-link', function(e) {
						if ($(this).hasClass('playing')) {
							player_custom_music.play();
						} else {
							player_custom_music.stop();
						};
					});
					
					$(document).on('click', '.popup .close, .popup .overlay', function(e) {
						$('.soundtrack .creation .music-player').removeClass('active');
						$('.soundtrack .creation .step').removeClass('active');
						$('.soundtrack .creation .step._1').addClass('active');
						clearTimeout(timeoutRecordingAudio);
						audioRecord.stopRecording();
						player_custom_music.stop();
						player_custom_sound.stop();
					});
				}, function(error) {
					$('button.create-song').remove();
					$('.popup .window button.close').trigger('click');
				});
				/*[Sound recording >]*/
				
				$('button.create-song').on('click', function(e) {
					soundManager.stopAll();
				});
			} else {
				$('button.create-song').remove();
			};
			/*[Create custom song >]*/
			
			/*[===Action >]*/
			
			/*[===Controls <]*/
			
			/*[Songs list <]*/
			$('.songs-list :radio').on('ifChecked', function(e) {
				var $this = $(this),
					value = $this.val();
				if (parseInt(value) < 5) {
					soundManager.stopAll();
					is_custom_sound = false;
					sound_src = sounds[value].src[0];
					music_src = sounds[value].src[1];
					$('.service button.create-song').show();
					$('.service .songs-list .item.custom').hide();
					$('.soundtrack .text .item[data-index="'+value+'"]').addClass('active').siblings().removeClass('active');
					$('.soundtrack .title .item[data-index="'+value+'"]').addClass('active').siblings().removeClass('active');
				};
			});
			$('.songs-list .player-link').on('click', function(e) {
				$(this).parents('label').find(':radio').iCheck('check');
			});
			/*[Songs list >]*/
			
			/*[Select star <]*/
			$('.service .star:radio').on('ifChanged', function(e) {
				showSelectStarOnToolbar($(this).val());
				$('.service .editor button.remove').hide();
			});
			/*[Select star >]*/
			
			/*[Nav progress <]*/
			$('nav.progress span').click(function(e) {
				var $this = $(this), stage = $this.data('stage');
				if ($this.hasClass('enable') && !$this.hasClass('active')) {
					$this.addClass('active').siblings().removeClass('active');
					$this.prevAll().addClass('enable').removeClass('disable');
					
					soundManager.stopAll();
					$('.service .editor .player').hide();
									
					for (key in mask_time_lines) {
						mask_time_lines[key].kill();
						delete mask_time_lines[key];
					};
					
					if (stage == 1) {
						setStage('1.2');
						showMaskOnToolbar(mask_on_toolbar);
					};
					if (stage == 2) {
						setStage('2.0');
						showStarOnToolbar();
					};
					if (stage == 3) {
						setStage('3.0');
					};
					if (stage == 4) {
						setStage('4.0');
						savePicture();
						animateClipart();
						$('.service .editor .player').show();
						if (is_custom_sound) {
							playSoundSet();
						} else {
							playSound();
						};
					};
					
				};
			});
			/*[Nav progress >]*/
			
			/*[Button remove <]*/
			$('.service .editor button.remove').on('click', function(e) {
				if (selected_element.name() == 'star') {
					var group_name = selected_element.getAttr('group'),
						group = toolbar.find('.'+group_name)[0];
					
					group.children[1].setAttrs({
						opacity: 1,
						visible: true,
						draggable: true
					});
					
					star_on_photo.destroy();
					star_on_photo = false;
					
					showStarOnToolbar();
				};
				$('.service .editor button.remove').hide();
				selected_element.destroy();
				selected_element = false;
				workspace.draw();
				toolbar.draw();
			});
			/*[Button remove >]*/
			
			/*[===Controls >]*/
	
			stage.add(scene);
			stage.add(workspace);
			stage.add(toolbar);
			
		};
		/*[===> EDITOR <===]*/
		
	});
	
});



$(function() {
	
	/*[Popup <]*/
	$('[data-popup]').on('click', function(e) {
		var popup = $(this).data('popup');
		$('body').css({'overflow': 'hidden'});
		$('.popup[data-name="'+popup+'"]').fadeIn('fast');
	});
	$('.popup .close, .popup .overlay').on('click', function(e) {
		$('body').css({'overflow': 'visible'});
		$(this).parents('.popup').fadeOut('fast');
	});
	/*[Popup >]*/
	
	/*[Fields <]*/
	$('input').iCheck({
		radioClass: 'radio',
		checkboxClass: 'checkbox'
	});
	/*[Fields >]*/
	
	/*[Checking <]*/
	$('.checking .options .button.not').on('click', function(e) {
		$('.checking .display._2').addClass('active').siblings().removeClass('active');
		return false;
	});
	/*[Checking >]*/
	
});

$(window).load(function() {
	TweenMax.to('#preloader', .6, {opacity: 0, display: 'none'});
});
