<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>
		@section('title')
			RFC y CURP para México
		@show
	</title>
	<!-- Mobile Specific Metas
	================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<script src="{{ asset('js/calculadora_rfc_curp.js') }}"></script>
	<!-- CSS
	================================================== -->
	<link rel="stylesheet" type="text/css" href="{{ asset('font-awesome/css/font-awesome.min.css') }}">
	<link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="{{asset('foundation/css/normalize.css')}}">
    <link rel="stylesheet" href="{{asset('foundation/css/foundation.min.css')}}">
    <script src="{{asset('foundation/js/vendor/modernizr.js')}}"></script>
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
     <link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">
	 <script>
		
	</script>
</head>
<body>
	<!-- Container -->
		<div class="wrap">
		<div class="container">
			<!-- Content -->
			@yield('content')
			<!-- ./ content -->
		</div>
		<!-- ./ container -->

		</div>

<!-- Javascripts
================================================== -->

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script src="//code.jquery.com/jquery-1.10.2.js"></script>
<script src="//code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
<script src="{{asset('foundation/js/foundation.min.js')}}"></script>
<script>
	$(document).foundation();

	$(function() {
		$( "#datepicker" ).datepicker({
			changeMonth: true,
			changeYear: true,
			dateFormat: 'ymmdd',
			yearRange: 'c-100:c+0'
		});
	});
</script>
</body>
</html>