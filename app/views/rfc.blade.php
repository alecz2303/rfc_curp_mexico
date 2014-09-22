@extends('hello')

@section('content')

<h1>Calculadora de RFC y CURP</h1>

<?php if(isset($_POST['submit'])): ?>

	<div class="panel callout radius"> 
		<h1>R.F.C.</h1> 
		<h2 class="subheader"><?php echo $_POST['rfc']; ?></h2>
	</div>

	<div class="panel callout radius"> 
		<h1>CURP</h1> 
		<h2 class="subheader"><?php echo $_POST['curp']; ?></h2>
	</div>

	<a href="{{ URL::to('/') }}" class="button">Calcular nuevo</a>

<?php else: ?>


	<form method="post" data-abide>
		<div class="row">
			<div class="large-4 columns">
				<label>
					Nombre(s)
					<input type="text" placeholder="Nombre(s)" name="nombre" id="nombre" required pattern="[a-zA-Z]+" />
				</label>
				<small class="error">Nombre es requerido y debe ser texto.</small>
			</div>

			<div class="large-4 columns">
				<label>
					Apellido Paterno
					<input type="text" placeholder="Apellido Paterno" name="ap_paterno" id="ap_paterno" required pattern="[a-zA-Z]+" />
				</label>
				<small class="error">Apellido paterno es requerido y debe ser texto.</small>
			</div>

			<div class="large-4 columns">
				<label>
					Apellido Materno
					<input type="text" placeholder="Apellido Materno" name="ap_materno" id="ap_materno" />
				</label>
			</div>
		</div>

		<div class="row">
			<div class="large-4 columns">
				<label>Select Box
			        <select name="sexo" id="sexo" required>
			          <option value="">Seleccione uno</option>
			          <option value="H">Hombre</option>
			          <option value="M">Mujer</option>
			        </select>
			    </label>
			    <small class="error">Sexo es requerido y debe ser texto.</small>
			</div>

			<div class="large-4 columns">
				<label>
					Fecha de Nacimiento
					<input type="text" placeholder="Fecha de Naciemiento" id="datepicker" name="fec_nac" required />
				</label>
				<small class="error">Fecha de nacimiento es requerido.</small>
			</div>

			<div class="large-4 columns">
				<label>Select Box
			        <select name="estado" id="estado" required>
			            <option value="">Seleccione uno</option>
			        	<option value="AS">AGUASCALIENTES</option>
	                    <option value="BC">BAJA CALIFORNIA</option>
	                    <option value="BS">BAJA CALIFORNIA SUR</option>
	                    <option value="CC">CAMPECHE</option>
	                    <option value="CL">COAHUILA</option>
	                    <option value="CM">COLIMA</option>
	                    <option value="CS">CHIAPAS</option>
	                    <option value="CH">CHIHUHUA</option>
	                    <option value="DF">DISTRITO FEDERAL</option>
	                    <option value="DG">DURANGO</option>
	                    <option value="GT">GUANAJUATO</option>
	                    <option value="GR">GUERRERO</option>
	                    <option value="HG">HIDALGO</option>
	                    <option value="JC">JALISCO</option>
	                    <option value="MC">MEXICO</option>
	                    <option value="MN">MICHOACAN</option>
	                    <option value="MS">MORELOS</option>
	                    <option value="NT">NAYARIT</option>
	                    <option value="NL">NUEVO LEON</option>
	                    <option value="OC">OAXACA</option>
	                    <option value="PL">PUEBLA</option>
	                    <option value="QT">QUERETARO</option>
	                    <option value="QR">QUINTANA ROO</option>
	                    <option value="SP">SAN LUIS POTOSI</option>
	                    <option value="SL">SINALOA</option>
	                    <option value="SR">SONORA</option>
	                    <option value="TC">TABASCO</option>
	                    <option value="TS">TAMAULIPAS</option>
	                    <option value="TL">TLAXCALA</option>
	                    <option value="VZ">VERACRUZ</option>
	                    <option value="YN">YUCATAN</option>
	                    <option value="ZS">ZACATECAS</option>
	                    <option value="NE">NACIDO EN EL EXTRANJERO</option>
			        </select>
			    </label>
			    <small class="error">Estado es requerido.</small>
			</div>
		</div>

		<input id="rfc" name="rfc" type="hidden" />
		<input id="curp" name="curp" type="hidden" />


		<input type="submit" onclick="calcula();" name="submit" value="Calcular" class="button">

	</form>

<?php endif; ?>

@stop