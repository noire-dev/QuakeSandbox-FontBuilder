
(function()
{
	var worker_error = document.getElementById( 'worker_error' );
	var download_error = document.getElementById( 'download_error' );
	var drag_error = document.getElementById( 'drag_error' );
	var filereader_error = document.getElementById( 'filereader_error' );

	var name_input = document.getElementById( 'font_name' );
	var local_name_input = document.getElementById( 'font_local' );
	var local_file_input = document.getElementById( 'font_localfile' );
	var url_input = document.getElementById( 'font_url' );
	var url_button = document.getElementById( 'url_button' );
	var offset_x_input = document.getElementById( 'offset_x' );
	var offset_y_input = document.getElementById( 'offset_y' );
	var size_input = document.getElementById( 'font_size' );
	var weight_normal_input = document.getElementById( 'font_weight_normal' );
	var weight_bold_input = document.getElementById( 'font_weight_bold' );
	var weight_bolder_input = document.getElementById( 'font_weight_bolder' );
	var weight_lighter_input = document.getElementById( 'font_weight_lighter' );
	var weight_inputs = document.getElementsByName( 'font_weight' );
	var style_normal_input = document.getElementById( 'font_style_normal' );
	var style_italic_input = document.getElementById( 'font_style_italic' );
	var style_oblique_input = document.getElementById( 'font_style_oblique' );
	var style_inputs = document.getElementsByName( 'font_style' );
	var variant_normal_input = document.getElementById( 'font_variant_normal' );
	var variant_smallcaps_input = document.getElementById( 'font_variant_small-caps' );
	var variant_inputs = document.getElementsByName( 'font_variant' );
	var alpha_input = document.getElementById( 'font_alpha' );
	var color_input = document.getElementById( 'font_color' );
	var char_input = document.getElementById( 'font_char' );
	var char_create_button = document.getElementById( 'create_button' );

	var pos_x_input = document.getElementById( 'pos_x' );
	var pos_y_input = document.getElementById( 'pos_y' );
	var copy_char_button = document.getElementById( 'copy_char_button' );


	var char_image_max_block = document.getElementById( 'char_image_max_block' );
	var char_image = document.getElementById( 'char_image' );
	var char_canvas = document.getElementById( 'char_canvas' );

	var group2_show_button = document.getElementById( 'group2_show_button' );
	var group2_table = document.getElementById( 'char_group2_table' );

	var group2_numbers_button = document.getElementById( 'group2_numbers_button' );
	var group2_letters_button = document.getElementById( 'group2_letters_button' );
	var group2_all_button = document.getElementById( 'group2_all_button' );

	var group3_show_button = document.getElementById( 'group3_show_button' );
	var group3_table = document.getElementById( 'char_group3_table' );

	var group3_letters_button = document.getElementById( 'group3_letters_button' );
	var group3_all_button = document.getElementById( 'group3_all_button' );

	var blank_char_input = document.getElementById( 'blank_char' );
	var blank_canvas = document.getElementById( 'blank_canvas' );

	var group_numbers_button = document.getElementById( 'group_numbers_button' );
	var group_letters_button = document.getElementById( 'group_letters_button' );
	var group_all_button = document.getElementById( 'group_all_button' );

	var original_image = document.getElementById( 'original_image' );

	var workspace_canvas = document.getElementById( 'workspace_canvas' );
	var clear_canvas_button = document.getElementById( 'clear_canvas_button' );
	var workspace_size_input = document.getElementById( 'workspace_char_size' );
	var workspace_change_button = document.getElementById( 'workspace_change_button' );
	var workspace_size_label = document.getElementById( 'workspace_size_label' );


	var pk3_download_link = document.getElementById( 'pk3_download_link' );
	var pk3_compression_input = document.getElementById( 'pk3_compression_input' );
	var pk3_button = document.getElementById( 'pk3_button' );

	var upload_image_input = document.getElementById( 'upload_image' );
	var upload_name_input = document.getElementById( 'upload_font_name' );
	var upload_submit_button = document.getElementById( 'upload_button' );


	var hand_button = document.getElementById( 'hand_button' );
	var hand_image = document.getElementById( 'hand_image' );

	var drop_image = document.getElementById( 'drop_image' );
	var text_data = document.getElementById( 'text_data' );


	var group2_visible = false;
	var group3_visible = false;


	var char_images = new Array();

	var group_all_images = new Array();
	var group_letter_images = new Array();
	var group_number_images = new Array();

	var group2_all_images = new Array();
	var group2_letter_images = new Array();
	var group2_number_images = new Array();

	var group3_all_images = new Array();
	var group3_letter_images = new Array();

	function image_drag( event )
	{
		event.dataTransfer.setData( "Text", event.target.id );
	}

	(function()
	{

		var images_id_string = 'char_group_%1';
		var pos_x;
		var pos_y;
		var image_id;
		var image;
		var j = 0;
		var ga = 0;
		var gn = 0;
		var gl = 0;
		var g2a = 0;
		var g2n = 0;
		var g2l = 0;
		var g3a = 0;
		var g3n = 0;
		var g3l = 0;
		var i;
		
		for( i = 0; i < 256; i++ ) 
		{
			image_id = images_id_string.replace(/%1/, i );

			image = document.getElementById( image_id );
			if( !image )
			{
				continue;
			}
			pos_x = i%16;
			pos_y = Math.floor( i/16 );
			image.setAttribute( 'data-x', pos_x );
			image.setAttribute( 'data-y', pos_y );

			image.addEventListener( "dragstart", image_drag, false );

			char_images[j] = image;
			j++;
			if( i >= 33 && i <= 127 )
			{
				group_all_images[ga] = image;
				ga++;
				if( i >= 48 && i <= 57 )
				{
					group_number_images[gn] = image;
					gn++;
				} else
				if( ( i >= 65 && i <= 91 ) || ( i >= 97 && i <= 123 ) )
				{
					group_letter_images[gl] = image;
					gl++;
				}
			}
			if( i >= 144 && i <= 223 )
			{
				group2_all_images[g2a] = image;
				g2a++;
				if( i >= 146 && i <= 154 )
				{
					group2_number_images[g2n] = image;
					g2n++;
				} else
				if( i >= 193 && i <= 218 )
				{
					group2_letter_images[g2l] = image;
					g2l++;				
				}
			}
			if( i >= 224 && i <= 255 )
			{
				group3_all_images[g3a] = image;
				g3a++;
				if( i >= 225 && i <= 250 )
				{
					group3_letter_images[g3l] = image;
					g3l++;
				}
			}
			if ( i >= 128 && i <= 132)
			{
				group_all_images[ga] = image;
				ga++;
			}
			if ( i >= 1 && i <= 32)
			{
				group_all_images[ga] = image;
				ga++;
			}
		}
	})();

	/* http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
	function hexToRgb(hex) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

	function get_selected_option( options ) 
	{
		var count = options.length;

		for( x = 0; x < count; x++ ) 
		{
			if( options[x].checked ) 
			{
				return options[x].value;
			}
		}
		return "";
	}

	function update_char_image_list( canvas, images ) 
	{

		var offset_x_value = parseInt( offset_x_input.value, 10 );
		var offset_y_value = parseInt( offset_y_input.value, 10 );

		var size_value = parseInt( size_input.value, 10 );

		var weight_value = get_selected_option( weight_inputs );
		if( weight_value == "normal" ) 
		{
			weight_value = "";
		}

		var style_value = get_selected_option( style_inputs );
		if( style_value == "normal" ) 
		{
			style_value = "";
		}

		var variant_value = get_selected_option( variant_inputs );
		if( variant_value == "normal" ) 
		{
			variant_value = "";
		}

		var color_value = hexToRgb( color_input.value );

		var alpha_value = alpha_input.value;
		if( alpha_value.charAt( alpha_value.length - 1 ) == '.' )
		{
			alpha_value = alpha_value.substr( 0, alpha_value.length - 1 );
		}

		var context = canvas.getContext( "2d" );
		context.fillStyle = "rgba(" + color_value.r + "," + color_value.g + "," + color_value.b + "," + alpha_value + ")";
		context.font = variant_value + ' ' + style_value + ' ' + weight_value + ' ' + size_value + 'px "' + name_input.value + '"';

		context.textAlign = "center"; 
		context.textBaseline = 'middle';
		var length = images.length;
		for( i = 0; i < length; i++ ) 
		{
			image = images[i];
			c = image.getAttribute( "data-char" ).charAt( 0 );
			context.clearRect( 0, 0, canvas.width, canvas.height );
			context.fillText( c, canvas.width / 2 + offset_x_value, canvas.height / 2 + offset_y_value );
			image.src = canvas.toDataURL();
		}

	}

	var char_image_array = new Array();
	char_image_array[0] = char_image;

	function update_char_images() 
	{
		char_image.setAttribute( "data-char", char_input.value );

		update_char_image_list( char_canvas, char_image_array );

		update_char_image_list( blank_canvas, group_all_images );
		if( group2_visible )
		{
			update_char_image_list( blank_canvas, group2_all_images );
		}
		if( group3_visible )
		{
			update_char_image_list( blank_canvas, group3_all_images );
		}
		//update_char_image_list( blank_canvas, char_images );
	}

	update_char_images();


	/* http://www.kirupa.com/html5/detect_whether_font_is_installed.htm */
	function doesFontExist(fontName) {
		// creating our in-memory Canvas element where the magic happens
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");
	    
		// the text whose final pixel size I want to measure
		var text = "abcdefghijklmnopqrstuvwxyz0123456789";

		// specifying the baseline font
		context.font = "72px monospace";

		// checking the size of the baseline text
		var baselineSize = context.measureText(text).width;

		// specifying the font whose existence we want to check
		context.font = "72px '" + fontName + "', monospace";

		// checking the size of the font we want to check
		var newSize = context.measureText(text).width;

		// removing the Canvas element we created
		delete canvas;

		//
		// If the size of the two text instances is the same, the font does not exist because it is being rendered
		// using the default sans-serif font
		//
		if (newSize == baselineSize) {
			return false;
		} else {
			return true;
		}
	}
	
	function update_font_name_existance() 
	{
		if( name_input.value != "" && doesFontExist( name_input.value ) )
		{
			var class_name = name_input.getAttribute( "data-class-exists" );
			if( class_name )
			{
				name_input.className = class_name;
			}
		} else
		{
			name_input.className = '';
		}
	}
	update_font_name_existance();

	name_input.addEventListener( "input", function() 
	{
		update_char_images();
		update_font_name_existance();

	}, false );

	local_file_input.addEventListener('change', function() 
	{
		var name = local_name_input.value;

		if( !name || name == "" )
		{
			return;
		}
//		const fileList = event.target.files;
//		console.log(fileList[0].name);

		var fr = new FileReader();

		fr.onload = function(e) {
			var buffer = fr.result;

			var font = new FontFace(name, buffer);

			font.load().then(function(loaded_face) {
				var family = font.family;
				// add font to document
				document.fonts.add(font);
				// enable font with CSS class
				document.body.classList.add('fonts-loaded');

				var new_style = document.createElement( 'style' );

				new_style.appendChild( 
					document.createTextNode( "@font-face { font-family: '" + family + "'; src: local(" + family + "); }" ) 
				);

				document.head.appendChild( new_style );

				name_input.value = family;

				update_char_images();
			}).catch(function(error) {
				// error occurred
				local_file_input.value = "";
				alert("Could not load font!");
			});

		};
		fr.readAsArrayBuffer(local_file_input.files[0]);

	});

	url_input.addEventListener( "input", update_char_images, false );

	url_button.addEventListener( "click", function() 
	{
		var url = url_input.value;
		if( !url || url == "" )
		{
			return;
		}
		var url_string = url != ""? ( "url('" + url + "')" + "" ): "";

		var base = new String( url ).substring( url.lastIndexOf('/') + 1); 
		if( base.lastIndexOf( "." ) != -1 )
		{
			base = base.substring( 0, base.lastIndexOf( "." ) );
		}
		name = 'Custom ' + base;

		var new_style = document.createElement( 'style' );

		new_style.appendChild( 
			document.createTextNode( "@font-face { font-family: '" + name + "'; src: " + url_string + "; }" ) 
		);

		document.head.appendChild( new_style );

		name_input.value = name;

		update_char_images();
	}, false );

	offset_x_input.addEventListener( "input", update_char_images, false );
	offset_y_input.addEventListener( "input", update_char_images, false );

	size_input.addEventListener( "input", update_char_images, false );

	weight_normal_input.addEventListener( "change", update_char_images, false );
	weight_bold_input.addEventListener( "change", update_char_images, false );
	weight_bolder_input.addEventListener( "change", update_char_images, false );
	weight_lighter_input.addEventListener( "change", update_char_images, false );

	style_normal_input.addEventListener( "change", update_char_images, false );
	style_italic_input.addEventListener( "change", update_char_images, false );
	style_oblique_input.addEventListener( "change", update_char_images, false );

	variant_normal_input.addEventListener( "change", update_char_images, false );
	variant_smallcaps_input.addEventListener( "change", update_char_images, false );

	alpha_input.addEventListener( "input", update_char_images, false );
	color_input.addEventListener( "input", update_char_images, false );
	char_input.addEventListener( "input", update_char_images, false );
	char_input.addEventListener( "keydown", function() 
	{
		char_input.value = '';
	}, false );

	char_create_button.addEventListener( "click", update_char_images, false );

	function copy_char_images_to_workspace( images, width, height )
	{
		var context = workspace_canvas.getContext( "2d" );

		var length = images.length;
		var pos_x;
		var pos_y;
		var x_px;
		var y_px;
		var ixs;
		var iys;

		for( i = 0; i < length; i++ ) 
		{
			image = images[i];
			pos_x = image.getAttribute( 'data-x' );
			pos_y = image.getAttribute( 'data-y' );

			x_px = pos_x * width;
			y_px = pos_y * height;

			context.clearRect( x_px, y_px, width, height );

			ixs = image.clientWidth / 2 - width / 2;
			iys = image.clientHeight / 2 - height / 2;

			/* does not allow to cut the same size */
			if( ixs == 0 && iys == 0 )
			{
				context.drawImage( image, x_px, y_px, width, height );
			} else
			{
				context.drawImage( image, ixs, iys, width, height, x_px, y_px, width, height );
			}

		}

	}
	copy_char_button.addEventListener( "click", function() 
	{
		var pos_x = parseInt( pos_x_input.value, 10 );
		if( !pos_x || pos_x < 1 )
		{
			pos_x = 1;
		}
		pos_x--;
		var pos_y = parseInt( pos_y_input.value, 10 );
		if( !pos_y || pos_y < 1 )
		{
			pos_y = 1;
		}
		pos_y--;
		char_image.setAttribute( 'data-x', pos_x );
		char_image.setAttribute( 'data-y', pos_y );

		copy_char_images_to_workspace( char_image_array, blank_canvas.clientWidth, blank_canvas.clientHeight );

		pk3_button.disabled = false;
		upload_submit_button.disabled = false;
		hand_button.disabled = false;
	}, false );

	char_image.addEventListener( "dragstart", image_drag, false );

	group2_show_button.addEventListener( "click", function() 
	{
		if( group2_visible )
		{
			group2_numbers_button.style.display = "none";
			group2_letters_button.style.display = "none";
			group2_all_button.style.display = "none";
			group2_table.style.display = "none";
			group2_visible = false;
		} else
		{
			group2_numbers_button.style.display = "inline-block";
			group2_letters_button.style.display = "inline-block";
			group2_all_button.style.display = "inline-block";
			group2_table.style.display = "block";
			group2_visible = true;
		}
		var text = group2_show_button.innerHTML;
		group2_show_button.innerHTML = group2_show_button.getAttribute( 'data-text' );
		group2_show_button.setAttribute( 'data-text', text );

		update_char_images();
	}, false );
	group2_numbers_button.addEventListener( "click", function() 
	{
		copy_char_images_to_workspace( group2_number_images, blank_canvas.clientWidth, blank_canvas.clientHeight );

		pk3_button.disabled = false;
		upload_submit_button.disabled = false;
		hand_button.disabled = false;
	}, false );
	group2_letters_button.addEventListener( "click", function() 
	{
		copy_char_images_to_workspace( group2_letter_images, blank_canvas.clientWidth, blank_canvas.clientHeight );

		pk3_button.disabled = false;
		upload_submit_button.disabled = false;
		hand_button.disabled = false;
	}, false );
	group2_all_button.addEventListener( "click", function() 
	{
		copy_char_images_to_workspace( group2_all_images, blank_canvas.clientWidth, blank_canvas.clientHeight );

		pk3_button.disabled = false;
		upload_submit_button.disabled = false;
		hand_button.disabled = false;
	}, false );

	group3_show_button.addEventListener( "click", function() 
	{
		if( group3_visible )
		{
			group3_letters_button.style.display = "none";
			group3_all_button.style.display = "none";
			group3_table.style.display = "none";
			group3_visible = false;
		} else
		{
			group3_letters_button.style.display = "inline-block";
			group3_all_button.style.display = "inline-block";
			group3_table.style.display = "block";
			group3_visible = true;
		}
		var text = group3_show_button.innerHTML;
		group3_show_button.innerHTML = group3_show_button.getAttribute( 'data-text' );
		group3_show_button.setAttribute( 'data-text', text );

		update_char_images();
	}, false );
	group3_letters_button.addEventListener( "click", function() 
	{
		copy_char_images_to_workspace( group3_letter_images, blank_canvas.clientWidth, blank_canvas.clientHeight );

		pk3_button.disabled = false;
		upload_submit_button.disabled = false;
		hand_button.disabled = false;
	}, false );
	group3_all_button.addEventListener( "click", function() 
	{
		copy_char_images_to_workspace( group3_all_images, blank_canvas.clientWidth, blank_canvas.clientHeight );

		pk3_button.disabled = false;
		upload_submit_button.disabled = false;
		hand_button.disabled = false;
	}, false );


	group_numbers_button.addEventListener( "click", function() 
	{
		copy_char_images_to_workspace( group_number_images, blank_canvas.clientWidth, blank_canvas.clientHeight );

		pk3_button.disabled = false;
		upload_submit_button.disabled = false;
		hand_button.disabled = false;
	}, false );
	group_letters_button.addEventListener( "click", function() 
	{
		copy_char_images_to_workspace( group_letter_images, blank_canvas.clientWidth, blank_canvas.clientHeight );

		pk3_button.disabled = false;
		upload_submit_button.disabled = false;
		hand_button.disabled = false;
	}, false );
	group_all_button.addEventListener( "click", function() 
	{
		copy_char_images_to_workspace( group_all_images, blank_canvas.clientWidth, blank_canvas.clientHeight );

		pk3_button.disabled = false;
		upload_submit_button.disabled = false;
		hand_button.disabled = false;
	}, false );


	function clear_workspace() 
	{
		var context = workspace_canvas.getContext( "2d" );

		context.clearRect( 0, 0, workspace_canvas.width, workspace_canvas.height );
		context.drawImage( original_image, 0, 0, workspace_canvas.width, workspace_canvas.height );
	}

	original_image.onload = function() 
	{
		clear_workspace();
		original_image.onload = "";
	}
	clear_workspace();
	original_image.src = "bigchars.png";


	clear_canvas_button.addEventListener( "click", function() 
	{
		clear_workspace();

		pk3_button.disabled = true;
		upload_submit_button.disabled = true;
		hand_button.disabled = true;
	}, false );

	workspace_change_button.addEventListener( "click", function() 
	{
		var f = 2;
		char_image_max_block.setAttribute( "style", "width:" + ( workspace_size_input.value * f ) + "px;" + "height:" + ( workspace_size_input.value * f ) + "px" );

		var f1 = 0.5;
		var f2 = 1;
		var w = 1; /* border size */
		var h = 1;
		char_image_bg_block.setAttribute( "style", "left:" + ( workspace_size_input.value * f1 - w ) + "px;" + "top:" + ( workspace_size_input.value * f1 - h ) + "px;" + "width:" + ( workspace_size_input.value * f2 ) + "px;" + "height:" + ( workspace_size_input.value * f2 ) + "px;" );

		workspace_canvas.width = workspace_size_input.value * 16;
		workspace_canvas.height = workspace_size_input.value * 16;

		blank_canvas.width = workspace_size_input.value * 1;
		blank_canvas.height = workspace_size_input.value * 1;

		char_canvas.width = workspace_size_input.value * 2;
		char_canvas.height = workspace_size_input.value * 2;

		clear_workspace();
		update_char_images();

		workspace_size_label.innerHTML = workspace_canvas.width + 'x' + workspace_canvas.height;

		pk3_button.disabled = true;
		upload_submit_button.disabled = true;
		hand_button.disabled = true;
	}, false );

	workspace_size_label.innerHTML = workspace_canvas.width + 'x' + workspace_canvas.height;

	/* http://www.quirksmode.org/js/findpos.html */
	function findPos( obj ) 
	{
		var curleft = curtop = 0;
		if( obj.offsetParent ) 
		{
			do 
			{
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;

			} while (obj = obj.offsetParent);
		}
		return [curleft,curtop];
	}

	function canvas_drop( event, dropped )
	{
		event.preventDefault();
		var width_node = blank_canvas;
		var height_node = blank_canvas;

		var width = width_node.width;
		var height = width_node.height;

		var data = event.dataTransfer.getData( "Text" );

		if( data && data != "" )
		{
			var image = document.getElementById( data );
			if( image.tagName != 'img' && image.tagName != 'IMG' )
			{
				return;
			}

			if( data != char_image.id && ( image.clientWidth != width || image.clientHeight != height ) )
			{
				return;
			}
		} else
		if( dropped == true )
		{
			var image = drop_image;
		} else
		if( event.dataTransfer.files[0] )
		{
			if( typeof( FileReader ) === "undefined" )
			{
				return;
			}
			file = event.dataTransfer.files[0];

			var reader = new FileReader();
			var image = drop_image;

			reader.onload = (function( file ) {
				return function(e) {
					image.onload = function( e ) {
						if( image.clientWidth != width || image.clientHeight != height )
						{
							return;
						}
						canvas_drop( event, true );
					}
					image.src = this.result;
				};
			})( file );
			reader.readAsDataURL( file );
			return;
		} else
		{

			return;
		}
		var canvas = workspace_canvas;
		var context = canvas.getContext( "2d" );

		var canvas_pos = findPos( canvas );
		var x = event.pageX - canvas_pos[0];
		var y = event.pageY - canvas_pos[1];
		x = x - x % width;
		y = y - y % height;

		context.clearRect( x, y, width, height );

		context.drawImage( image, image.clientWidth/2-width/2, image.clientHeight/2-height/2, width, height, x, y, width, height );

	}

	workspace_canvas.addEventListener( "drop", function( event ) 
	{
		canvas_drop( event, false );

		pk3_button.disabled = false;
		upload_submit_button.disabled = false;
		hand_button.disabled = false;
	}, false );

	workspace_canvas.addEventListener( "dragover", function( event ) 
	{
		event.preventDefault();
	}, false );

	function create_pk3_download()
	{
		var canvas = workspace_canvas;
		var link = pk3_download_link;
		var input = name_input;
		var name = input.value;
		if( !name || name == "" )
		{
			name = "custom";
		}
		var filename = "zzz-font-" + name + ".pk3";
		filename = filename.toLowerCase();


		var header = String.fromCharCode.apply(null, [
			0,                                                     // char:  ID length (no ID)
			0,                                                     // char:  Colour map type (no colour map)
			2,                                                     // char:  Data type (Uncompressed TrueColor)
			0, 0,                                                  // short: Unused colour map data
			0, 0,                                                  // short: Unused colour map data
			0,                                                     // char:  Unused colour map data
			0, 0,                                                  // short: X origin
			0, 0,                                                  // short: Y origin
			canvas.width & 0x00ff, (canvas.width & 0xff00) >> 8,   // short: Width
			canvas.height & 0x00ff, (canvas.height & 0xff00) >> 8, // short: Height
			32,                                                    // char:  Bit depth (RGBA)
			0                                                      // char:  Image descriptor (default)
		]);

		var body = '';
		var data = canvas.getContext( '2d' ).getImageData( 0, 0, canvas.width, canvas.height ).data;

		for( var j = 0; j < canvas.height; ++j )
		{
			for( var i = 0; i < canvas.width; ++i )
			{
				offset = 4 * ( ( canvas.height - j - 1 ) * canvas.width + i );
				body += String.fromCharCode( data[offset + 0] );
				body += String.fromCharCode( data[offset + 1] );
				body += String.fromCharCode( data[offset + 2] );
				body += String.fromCharCode( data[offset + 3] );
			}
		}
		var tga = header.concat( body );

		zip.workerScriptsPath = "./zip/";

		var atga = "data:application/octet-stream;base64," + window.btoa( tga );
		zip.createWriter( new zip.Data64URIWriter( "application/octet-stream" ), function( writer ) 
		{
			writer.add( "gfx/2d/bigchars.tga", new zip.Data64URIReader( atga ), function() 
			{
				writer.close( function( uri ) 
				{
					link.href = uri;

					link.setAttribute( "download", filename );

					if( typeof( MouseEvent ) !== "undefined" )
					{
						var event = new MouseEvent( 'click', { 'view': window, 'bubbles': true, 'cancelable': true } );
						var result = link.dispatchEvent( event );
					} else
					if( typeof( link.click ) === "function" )
					{
						link.click();
					}

				} );

			}, function() //progress
			{

			}, { 'level': ( parseInt( pk3_compression_input.value, 10 ) % 10 ) }  );
		}, function( error_event ) 
		{
			alert( text_data.getAttribute( "data-text-create-pk3-error" ) );
		} );

	}

	pk3_button.addEventListener( "click", function() 
	{
		create_pk3_download();
	}, false );


	upload_submit_button.addEventListener( "click", function() 
	{
		upload_image_input.value = workspace_canvas.toDataURL();
		upload_name_input.value = name_input.value;
//		e.preventDefault();
	}, false );

	hand_button.addEventListener( "click", function() 
	{
		hand_image.src = workspace_canvas.toDataURL();
	}, false );


	if( typeof( Worker ) !== "undefined" )
	{
		worker_error.className = "worker_error_inactive";
	} else
	{
		worker_error.className = "worker_error_active";
	}
	if( typeof( pk3_download_link.download ) !== "undefined" )
	{
		download_error.className = "worker_error_inactive";
	} else
	{
		download_error.className = "worker_error_active";
	}
	if( typeof( char_image.draggable ) !== "undefined" )
	{
		drag_error.className = "drag_error_inactive";
	} else
	{
		drag_error.className = "drag_error_active";
	}
	if( typeof( FileReader ) !== "undefined" )
	{
		filereader_error.className = "filereader_error_inactive";
	} else
	{
		filereader_error.className = "filereader_error_active";
	}



})();