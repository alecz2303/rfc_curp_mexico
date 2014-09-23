    function calcula(){
        var ap_paterno = document.getElementById("ap_paterno").value;
        var ap_materno = document.getElementById("ap_materno").value;
        var nombre = document.getElementById("nombre").value;
        var rfc =  document.getElementById("datepicker").value;
        var sexo =  document.getElementById("sexo").value;
        var estado =  document.getElementById("estado").value;
        var dteNacimiento = rfc;
        //FILTRA ACENTOS
        var ap_pat_f = RFCFiltraAcentos(ap_paterno.toLowerCase());
        var ap_mat_f = RFCFiltraAcentos(ap_materno.toLowerCase());
        var nombre_f = RFCFiltraAcentos(nombre.toLowerCase());
        //GUARDA NOMBRE ORIGINAL PARA GENERAR HOMOCLAVE
        var ap_pat_orig = ap_pat_f;
        var ap_mat_orig = ap_mat_f;
        var nombre_orig = nombre_f;
        //ELIMINA PALABRAS SOBRANTES DE LOS NOMBRES
        ap_pat_f = RFCFiltraNombres(ap_pat_f);
        ap_mat_f = RFCFiltraNombres(ap_mat_f);
        nombre_f = RFCFiltraNombres(nombre_f);
        
        if(ap_pat_f.length>0 && ap_mat_f.length>0){
            if(ap_pat_f.length<3){
                rfc = RFCApellidoCorto(ap_pat_f,ap_mat_f,nombre_f);
            }else{
                rfc = RFCArmalo(ap_pat_f,ap_mat_f,nombre_f);
            }
        }
        
        if(ap_pat_f.length==0 && ap_mat_f.length>0){
            rfc = RFCUnApellido(nombre_f,ap_mat_f);
        }
        if(ap_pat_f.length>0 && ap_mat_f.length==0){
            rfc = RFCUnApellido(nombre_f,ap_pat_f);
        }
        
        rfc = RFCQuitaProhibidas(rfc);
        
        rfc = rfc.toUpperCase() + dteNacimiento + homonimia(ap_pat_orig,ap_mat_orig,nombre_orig);
        
        rfc = RFCDigitoVerificador(rfc);
        
        fnCalculaCURP(nombre_f.toUpperCase(), ap_pat_f.toUpperCase(), ap_mat_f.toUpperCase(), dteNacimiento, sexo, estado);
        
        document.getElementById("rfc").value = rfc;
        return false;
    }
    
    function RFCDigitoVerificador(rfc){
        var rfcsuma=[];
        var nv = 0;
        var y = 0;
        for (i=0;i<=rfc.length;i++){
            var letra = rfc.substr(i,1);
            switch(letra){
                case '0':
                    rfcsuma.push('00')
                    break;
                case '1':
                    rfcsuma.push('01')
                    break;
                case '2':
                    rfcsuma.push('02')
                    break;
                case '3':
                    rfcsuma.push('03')
                    break;
                case '4':
                    rfcsuma.push('04')
                    break;
                case '5':
                    rfcsuma.push('05')
                    break;
                case '6':
                    rfcsuma.push('06')
                    break;
                case '7':
                    rfcsuma.push('07')
                    break;
                case '8':
                    rfcsuma.push('08')
                    break;
                case '9':
                    rfcsuma.push('09')
                    break;
                case 'A':
                    rfcsuma.push('10')
                    break;
                case 'B':
                    rfcsuma.push('11')
                    break;
                case 'C':
                    rfcsuma.push('12')
                    break;
                case 'D':
                    rfcsuma.push('13')
                    break;
                case 'E':
                    rfcsuma.push('14')
                    break;
                case 'F':
                    rfcsuma.push('15')
                    break;
                case 'G':
                    rfcsuma.push('16')
                    break;
                case 'H':
                    rfcsuma.push('17')
                    break;
                case 'I':
                    rfcsuma.push('18')
                    break;
                case 'J':
                    rfcsuma.push('19')
                    break;
                case 'K':
                    rfcsuma.push('20')
                    break;
                case 'L':
                    rfcsuma.push('21')
                    break;
                case 'M':
                    rfcsuma.push('22')
                    break;
                case 'N':
                    rfcsuma.push('23')
                    break;
                case '&':
                    rfcsuma.push('24')
                    break;
                case 'O':
                    rfcsuma.push('25')
                    break;
                case 'P':
                    rfcsuma.push('26')
                    break;
                case 'Q':
                    rfcsuma.push('27')
                    break;
                case 'R':
                    rfcsuma.push('28')
                    break;
                case 'S':
                    rfcsuma.push('29')
                    break;
                case 'T':
                    rfcsuma.push('30')
                    break;
                case 'U':
                    rfcsuma.push('31')
                    break;
                case 'V':
                    rfcsuma.push('32')
                    break;
                case 'W':
                    rfcsuma.push('33')
                    break;
                case 'X':
                    rfcsuma.push('34')
                    break;
                case 'Y':
                    rfcsuma.push('35')
                    break;
                case 'Z':
                    rfcsuma.push('36')
                    break;
                case ' ':
                    rfcsuma.push('37')
                    break;
                case 'Ñ':
                    rfcsuma.push('38')
                    break;
                default:
                    rfcsuma.push('00');
            }
        }
        
        for(i=13;i>1;i--){
            nv=nv + (rfcsuma[y] * i);
            y++;
        }
            nv = nv%11;
        //alert(nv);
        if(nv == 0){
            rfc = rfc + nv;
        }else if(nv <= 10){
            nv = 11 - nv;
            if(nv == '10'){
                nv = 'A';
            }
            rfc = rfc + nv;
        }else if(nv == '10'){
            nv = 'A';
            rfc = rfc + nv;
        }
        return rfc
    }
    
    function RFCQuitaProhibidas(rfc){
        var res;
        rfc = rfc.toUpperCase();
        var strPalabras = "BUEI*BUEY*CACA*CACO*CAGA*CAGO*CAKA*CAKO*COGE*COJA*";
            strPalabras = strPalabras + "KOGE*KOJO*KAKA*KULO*MAME*MAMO*MEAR*";
            strPalabras = strPalabras + "MEAS*MEON*MION*COJE*COJI*COJO*CULO*";
            strPalabras = strPalabras + "FETO*GUEY*JOTO*KACA*KACO*KAGA*KAGO*";
            strPalabras = strPalabras + "MOCO*MULA*PEDA*PEDO*PENE*PUTA*PUTO*";
            strPalabras = strPalabras + "QULO*RATA*RUIN*";
        
        res = strPalabras.match(rfc); 
        
        if(res!=null){
            rfc = rfc.substr(0,3)+'X';
            return rfc;
        }else{
            return rfc;
        }
    }
    
    function RFCUnApellido(nombre,apellido){
        var rfc = apellido.substr(0,2) + nombre.substr(0,2);
        return rfc
    }
    
    function RFCArmalo(ap_paterno,ap_materno,nombre){
        
        var strVocales = 'aeiou';
        var strPrimeraVocal = '';
        var i=0;
        var x=0;
        var y=0;
        for (i=1;i<=ap_paterno.length;i++){
            //alert(ap_paterno.substr(i,1));
            if(y==0){
                for (x=0;x<=strVocales.length;x++){
                    //alert(strVocales.substr(x,1));
                    if(ap_paterno.substr(i,1)==strVocales.substr(x,1)){
                        y=1;
                        strPrimeraVocal = ap_paterno.substr(i,1);
                    }

                }
            }
            //break;
        }
        var rfc = ap_paterno.substr(0,1)+ strPrimeraVocal + ap_materno.substr(0,1) + nombre.substr(0,1);
        return rfc;
    }
    
    function RFCApellidoCorto(ap_paterno,ap_materno,nombre){
        var rfc = ap_paterno.substr(0,1) + ap_materno.substr(0,1) + nombre.substr(0,2);
        return rfc;
    }
    
    function RFCFiltraNombres(strTexto){
        var i = 0;
        var strArPalabras = [".", ",", "de ", "del ", "la ", "los ", "las ", "y ", "mc ", "mac ", "von ", "van "];
        for (i=0;i<=strArPalabras.length;i++){
            //alert(strArPalabras[i]);
            strTexto = strTexto.replace(strArPalabras[i],"");
        }
        
        strArPalabras = ["jose ", "maria ", "j ", "ma "];
        for (i=0;i<=strArPalabras.length;i++){
            //alert(strArPalabras[i]);
            strTexto = strTexto.replace(strArPalabras[i],"");
        }
        
        switch(strTexto.substr(0,2)){
            case 'ch':
                strTexto = strTexto.replace('ch','c')
                break;
            case 'll':
                strTexto = strTexto.replace('ll','l')
                break;
        }
        
        return strTexto
    }
    
    function RFCFiltraAcentos(strTexto){
        strTexto = strTexto.replace('á','a');
        strTexto = strTexto.replace('é','e');
        strTexto = strTexto.replace('í','i');
        strTexto = strTexto.replace('ó','o');
        strTexto = strTexto.replace('ú','u');
        return strTexto;
    }
    
    function homonimia(ap_paterno,ap_materno,nombre){
        
        var nombre_completo = ap_paterno.trim()+' '+ap_materno.trim()+' '+nombre.trim();
        var numero = '0';
        var letra;
        var numero1;
        var numero2;
        var numeroSuma = 0;
       //alert(nombre_completo);
        //alert(nombre_completo.length);
        for (i=0;i<=nombre_completo.length;i++){
            letra = nombre_completo.substr(i,1);
            switch(letra){
                case 'ñ':
                    numero = numero + '10'
                    break;
                case 'ü':
                    numero = numero + '10'
                    break;
                case 'a':
                    numero = numero + '11'
                    break;
                case 'b':
                    numero = numero + '12'
                    break;
                case 'c':
                    numero = numero + '13'
                    break;
                case 'd':
                    numero = numero + '14'
                    break;
                case 'e':
                    numero = numero + '15'
                    break;
                case 'f':
                    numero = numero + '16'
                    break;
                case 'g':
                    numero = numero + '17'
                    break;
                case 'h':
                    numero = numero + '18'
                    break;
                case 'i':
                    numero = numero + '19'
                    break;
                case 'j':
                    numero = numero + '21'
                    break;
                case 'k':
                    numero = numero + '22'
                    break;
                case 'l':
                    numero = numero + '23'
                    break;
                case 'm':
                    numero = numero + '24'
                    break;
                case 'n':
                    numero = numero + '25'
                    break;
                case 'ñ':
                    numero = numero + '40'
                    break;
                case 'o':
                    numero = numero + '26'
                    break;
                case 'p':
                    numero = numero + '27'
                    break;
                case 'q':
                    numero = numero + '28'
                    break;
                case 'r':
                    numero = numero + '29'
                    break;
                case 's':
                    numero = numero + '32'
                    break;
                case 't':
                    numero = numero + '33'
                    break;
                case 'u':
                    numero = numero + '34'
                    break;
                case 'v':
                    numero = numero + '35'
                    break;
                case 'w':
                    numero = numero + '36'
                    break;
                case 'x':
                    numero = numero + '37'
                    break;
                case 'y':
                    numero = numero + '38'
                    break;
                case 'z':
                    numero = numero + '39'
                    break;
                case ' ':
                    numero = numero + '00'
                    break;
            }
        }
        //alert(numero);
        for (i=0;i<=numero.length+1;i++){
            numero1 = numero.substr(i,2);
            numero2 = numero.substr(i+1,1);
            numeroSuma = numeroSuma + (numero1*numero2);
            
        }
        //alert(numeroSuma);
        var numero3 = numeroSuma % 1000;
        //alert(numero3);
        var numero4 = numero3/34;
        var numero5 = numero4.toString().split(".")[0];
        //alert(numero5);
        var numero6 = numero3%34;
        //alert(numero6);
        var homonimio = '';
        switch(numero5){
            case '0':
                homonimio = '1'
                break;
            case '1':
                homonimio = '2'
                break;
            case '2':
                homonimio = '3'
                break;
            case '3':
                homonimio = '4'
                break;
            case '4':
                homonimio = '5'
                break;
            case '5':
                homonimio = '6'
                break;
            case '6':
                homonimio = '7'
                break;
            case '7':
                homonimio = '8'
                break;
            case '8':
                homonimio = '9'
                break;
            case '9':
                homonimio = 'A'
                break;
            case '10':
                homonimio = 'B'
                break;
            case '11':
                homonimio = 'C'
                break;
            case '12':
                homonimio = 'D'
                break;
            case '13':
                homonimio = 'E'
                break;
            case '14':
                homonimio = 'F'
                break;
            case '15':
                homonimio = 'G'
                break;
            case '16':
                homonimio = 'H'
                break;
            case '17':
                homonimio = 'I'
                break;
            case '18':
                homonimio = 'J'
                break;
            case '19':
                homonimio = 'K'
                break;
            case '20':
                homonimio = 'L'
                break;
            case '21':
                homonimio = 'M'
                break;
            case '22':
                homonimio = 'N'
                break;
            case '23':
                homonimio = 'P'
                break;
            case '24':
                homonimio = 'Q'
                break;
            case '25':
                homonimio = 'R'
                break;
            case '26':
                homonimio = 'S'
                break;
            case '27':
                homonimio = 'T'
                break;
            case '28':
                homonimio = 'U'
                break;
            case '29':
                homonimio = 'V'
                break;
            case '30':
                homonimio = 'W'
                break;
            case '31':
                homonimio = 'X'
                break;
            case '32':
                homonimio = 'Y'
                break;
            case '33':
                homonimio = 'Z'
                break;
                
        }
        switch(numero6.toString()){
            case '0':
                homonimio = homonimio + '1'
                break;
            case '1':
                homonimio = homonimio + '2'
                break;
            case '2':
                homonimio = homonimio + '3'
                break;
            case '3':
                homonimio = homonimio + '4'
                break;
            case '4':
                homonimio = homonimio + '5'
                break;
            case '5':
                homonimio = homonimio + '6'
                break;
            case '6':
                homonimio = homonimio + '7'
                break;
            case '7':
                homonimio = homonimio + '8'
                break;
            case '8':
                homonimio = homonimio + '9'
                break;
            case '9':
                homonimio = homonimio + 'A'
                break;
            case '10':
                homonimio = homonimio + 'B'
                break;
            case '11':
                homonimio = homonimio + 'C'
                break;
            case '12':
                homonimio = homonimio + 'D'
                break;
            case '13':
                homonimio = homonimio + 'E'
                break;
            case '14':
                homonimio = homonimio + 'F'
                break;
            case '15':
                homonimio = homonimio + 'G'
                break;
            case '16':
                homonimio = homonimio + 'H'
                break;
            case '17':
                homonimio = homonimio + 'I'
                break;
            case '18':
                homonimio = homonimio + 'J'
                break;
            case '19':
                homonimio = homonimio + 'K'
                break;
            case '20':
                homonimio = homonimio + 'L'
                break;
            case '21':
                homonimio = homonimio + 'M'
                break;
            case '22':
                homonimio = homonimio + 'N'
                break;
            case '23':
                homonimio = homonimio + 'P'
                break;
            case '24':
                homonimio = homonimio + 'Q'
                break;
            case '25':
                homonimio = homonimio + 'R'
                break;
            case '26':
                homonimio = homonimio + 'S'
                break;
            case '27':
                homonimio = homonimio + 'T'
                break;
            case '28':
                homonimio = homonimio + 'U'
                break;
            case '29':
                homonimio = homonimio + 'V'
                break;
            case '30':
                homonimio = homonimio + 'W'
                break;
            case '31':
                homonimio = homonimio + 'X'
                break;
            case '32':
                homonimio = homonimio + 'Y'
                break;
            case '33':
                homonimio = homonimio + 'Z'
                break;
                
        }
        return homonimio;
    }

function fnCalculaCURP( pstNombre, pstPaterno, pstMaterno, dfecha, pstSexo, pnuCveEntidad ) {  

pstCURP   ="";
pstDigVer ="";
contador  =0;
contador1 =0;
pstCom    ="";
numVer    =0.00;
valor     =0;
sumatoria =0;



// se declaran las varibale que se van a utilizar para ontener la CURP

NOMBRES  ="";
APATERNO ="";
AMATERNO ="";
T_NOMTOT ="";
NOMBRE1  =""; //PRIMER NOMBRE
NOMBRE2  =""; //DEMAS NOMBRES
NOMBRES_LONGITUD =0; //LONGITUD DE TODOS @NOMBRES
var NOMBRE1_LONGITUD =0; //LONGITUD DEL PRIMER NOMBRE(MAS UNO,EL QUE SOBRA ES UN ESPACIO EN BLANCO)
APATERNO1 =""; //PRIMER NOMBRE
APATERNO2 =""; //DEMAS NOMBRES
APATERNO_LONGITUD =0; //LONGITUD DE TODOS @NOMBRES
APATERNO1_LONGITUD =0; //LONGITUD DEL PRIMER NOMBRE(MAS UNO,EL QUE SOBRA ES UN ESPACIO EN BLANCO)
AMATERNO1 =""; //PRIMER NOMBRE
AMATERNO2 =""; //DEMAS NOMBRES
AMATERNO_LONGITUD =0; //LONGITUD DE TODOS @NOMBRES
AMATERNO1_LONGITUD =0; //LONGITUD DEL PRIMER NOMBRE(MAS UNO,EL QUE SOBRA ES UN ESPACIO EN BLANCO)
VARLOOPS =0; //VARIABLE PARA LOS LOOPS, SE INICIALIZA AL INICIR UN LOOP


// Se inicializan las variables para obtener la primera parte de la CURP


NOMBRES  = pstNombre.replace(/^\s+|\s+$/g,"");
APATERNO = pstPaterno.replace(/^\s+|\s+$/g,"");
AMATERNO = pstMaterno.replace(/^\s+|\s+$/g,"");

T_NOMTOT = APATERNO + ' '+ AMATERNO + ' '+ NOMBRES;



// Se procesan los nombres de pila


VARLOOPS = 0;

while (VARLOOPS != 1)
    {

        NOMBRES_LONGITUD = NOMBRES.length

        var splitNombres = NOMBRES.split(" ");
        var splitNombre1 = splitNombres[0];
        
        NOMBRE1_LONGITUD = splitNombre1.length;
//      NOMBRE1_LONGITUD = PATINDEX('% %',@NOMBRES)

        if (NOMBRE1_LONGITUD = 0)
           {
            NOMBRE1_LONGITUD = NOMBRES_LONGITUD;
           }
            NOMBRE1 =  NOMBRES.substring(0,splitNombre1.length);
            NOMBRE2 =  NOMBRES.substring(splitNombre1.length + 1, NOMBRES.length);


// Se quitan los nombres de JOSE, MARIA,MA,MA.
/*
if (NOMBRE1 IN ('JOSE','MARIA','MA.','MA','DE','LA','LAS','MC','VON','DEL','LOS','Y','MAC','VAN') && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2
}
else
{
        VARLOOPS = 1
}
*/

if (NOMBRE1 == 'JOSE' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}

if (NOMBRE1 == 'MARIA' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}

if (NOMBRE1 == 'MA.' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}

if (NOMBRE1 == 'MA' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}

if (NOMBRE1 == 'DE' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}

if (NOMBRE1 == 'LA' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}

if (NOMBRE1 == 'LAS' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}


if (NOMBRE1 == 'MC' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}

if (NOMBRE1 == 'VON' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}


if (NOMBRE1 == 'DEL' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}


if (NOMBRE1 == 'LOS' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}

if (NOMBRE1 == 'Y' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}

if (NOMBRE1 == 'MAC' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}

if (NOMBRE1 == 'VAN' && NOMBRE2 != '')
{
        NOMBRES = NOMBRE2;
}
else
{
        VARLOOPS = 1;
}

} // fin varloops <> 1


// Se procesan los APELLIDOS, PATERNO EN UN LOOP

VARLOOPS = 0;

while (VARLOOPS != 1)
{

        APATERNO_LONGITUD = APATERNO.length;        
        
        var splitPaterno = APATERNO.split(" ");
        var splitPaterno1 = splitPaterno[0];
        APATERNO1_LONGITUD = splitPaterno1.length;

        if (APATERNO1_LONGITUD = 0)
           {
             APATERNO1_LONGITUD = APATERNO_LONGITUD;
           }

        APATERNO1 =  APATERNO.substring(0,splitPaterno1.length);
        APATERNO2 =  APATERNO.substring(splitPaterno1.length + 1, APATERNO.length);
                // Se quitan los sufijos


if ( APATERNO1 == 'DE' && APATERNO2 != '')
    {
        APATERNO = APATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }


if ( APATERNO1 == 'LA' && APATERNO2 != '')
    {
        APATERNO = APATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }



if ( APATERNO1 == 'LAS' && APATERNO2 != '')
    {
        APATERNO = APATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

if ( APATERNO1 == 'MC' && APATERNO2 != '')
    {
        APATERNO = APATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

if ( APATERNO1 == 'VON' && APATERNO2 != '')
    {
        APATERNO = APATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

if ( APATERNO1 == 'DEL' && APATERNO2 != '')
    {
        APATERNO = APATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }


if ( APATERNO1 == 'LOS' && APATERNO2 != '')
    {
        APATERNO = APATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

if ( APATERNO1 == 'Y' && APATERNO2 != '')
    {
        APATERNO = APATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

if ( APATERNO1 == 'MAC' && APATERNO2 != '')
    {
        APATERNO = APATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

if ( APATERNO1 == 'VAN' && APATERNO2 != '')
    {
        APATERNO = APATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

} // fin varloops


// Faltan: )


// Se procesan los APELLIDOS, MATERNO EN UN LOOP

VARLOOPS = 0;

while (VARLOOPS != 1)
{

        //SET @APATERNO_LONGITUD = LEN(@APATERNO)
        AMATERNO_LONGITUD = AMATERNO.length;        
        
        //SET @APATERNO1_LONGITUD = PATINDEX('% %',@APATERNO)
        var splitMaterno = AMATERNO.split(" ");
        var splitMaterno1 = splitMaterno[0];
        AMATERNO1_LONGITUD = splitMaterno1.length;

        if (AMATERNO1_LONGITUD = 0)
           {
             AMATERNO1_LONGITUD = AMATERNO_LONGITUD;
           }

        AMATERNO1 =  AMATERNO.substring(0,splitMaterno1.length);
        AMATERNO2 =  AMATERNO.substring(splitMaterno1.length + 1, AMATERNO.length);

// Se quitan los sufijos



if ( AMATERNO1 == 'DE' && AMATERNO2 != '')
    {
        AMATERNO = AMATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }


if ( AMATERNO1 == 'LA' && AMATERNO2 != '')
    {
        AMATERNO = AMATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }


if ( AMATERNO1 == 'LAS' && AMATERNO2 != '')
    {
        AMATERNO = AMATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

if ( AMATERNO1 == 'MC' && AMATERNO2 != '')
    {
        AMATERNO = AMATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

if ( AMATERNO1 == 'VON' && AMATERNO2 != '')
    {
        AMATERNO = AMATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

if ( AMATERNO1 == 'DEL' && AMATERNO2 != '')
    {
        AMATERNO = AMATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

if ( AMATERNO1 == 'LOS' && AMATERNO2 != '')
    {
        AMATERNO = AMATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

if ( AMATERNO1 == 'Y' && AMATERNO2 != '')
    {
        AMATERNO = AMATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

if ( AMATERNO1 == 'MAC' && AMATERNO2 != '')
    {
        AMATERNO = AMATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }

if ( AMATERNO1 == 'VAN' && AMATERNO2 != '')
    {
        AMATERNO = AMATERNO2;
    }
else
    {
        VARLOOPS = 1;
    }



} // fin varloops




// Se obtiene del primer apellido la primer letra y la primer vocal interna

pstCURP = APATERNO1.substring(0,1);

APATERNO1_LONGITUD= APATERNO1.length;
VARLOOPS = 0 // EMPIEZA EN UNO POR LA PRIMERA LETRA SE LA VA A SALTAR

while (APATERNO1_LONGITUD > VARLOOPS)
    {
        VARLOOPS = VARLOOPS + 1;

        // if SUBSTRING(@APATERNO1,@VARLOOPS,1) IN ('A','E','I','O','U')
        var compara = APATERNO1.substr(parseInt(VARLOOPS),1);

        if (compara == 'A')
           {
            pstCURP = pstCURP + compara;
            VARLOOPS = APATERNO1_LONGITUD;
           }
        if (compara == 'E')
           {
            pstCURP = pstCURP + compara;
            VARLOOPS = APATERNO1_LONGITUD;
           }
        if (compara == 'I')
           {
            pstCURP = pstCURP + compara;
            VARLOOPS = APATERNO1_LONGITUD;
           }
        if (compara == 'O')
           {
            pstCURP = pstCURP + compara;
            VARLOOPS = APATERNO1_LONGITUD;
           }
        if (compara == 'U')
           {
           
            pstCURP = pstCURP + compara;
            VARLOOPS = APATERNO1_LONGITUD;
           }

    }




// Se obtiene la primer letra del apellido materno 

pstCURP = pstCURP + AMATERNO1.substring(0,1);

// Se le agrega la primer letra del nombre

pstCURP = pstCURP + NOMBRES.substring(0,1);



pstCURP = pstCURP + dfecha + pstSexo + pnuCveEntidad;


// Se obtiene la primera consonante interna del apellido paterno


VARLOOPS = 0;

while (splitPaterno1.length > VARLOOPS)
      {
    VARLOOPS = VARLOOPS + 1
    var compara = APATERNO1.substr(parseInt(VARLOOPS),1);

    if (compara != 'A' && compara != 'E' && compara != 'I' && compara != 'O' && compara != 'U')
       {
        if ( compara == 'Ñ')
        {
             pstCURP = pstCURP + 'X';
        }
        else
        {
         pstCURP = pstCURP + compara;
        }

        VARLOOPS = splitPaterno1.length;
       }
      }


// Se obtiene la primera consonante interna del apellido materno

VARLOOPS = 0;

while (splitMaterno1.length > VARLOOPS)
      {

    VARLOOPS = VARLOOPS + 1;
    var compara = AMATERNO1.substr(parseInt(VARLOOPS),1);

    if (compara != 'A' && compara != 'E' && compara != 'I' && compara != 'O' && compara != 'U')
       {
        if ( compara == 'Ñ')
        {       
         pstCURP = pstCURP + 'X';
        }
            else
        {
         pstCURP = pstCURP + compara;
        }
        
        VARLOOPS = splitMaterno1.length;
       }
      }


// Se obtiene la primera consonante interna del nombre

VARLOOPS = 0;

while (splitNombre1.length > VARLOOPS)
      {

    VARLOOPS = VARLOOPS + 1;
    var compara = NOMBRE1.substr(parseInt(VARLOOPS),1);

    if (compara != 'A' && compara != 'E' && compara != 'I' && compara != 'O' && compara != 'U')
       {
        if (compara=='Ñ')       
        {
         pstCURP = pstCURP + 'X';
        }
        else
        {
         pstCURP = pstCURP + compara;
        }

        VARLOOPS = splitNombre1.length;
       }
      }


// Se obtiene el digito verificador



var contador = 18;
var contador1 = 0;
var valor = 0;
var sumatoria = 0;


while (contador1 <= 15)
    {

        //pstCom = SUBSTRING(@pstCURP,@contador1,1)
    var pstCom = pstCURP.substr(parseInt(contador1),1);
     
        if (pstCom == '0') 
            {
             valor = 0 * contador ;
            }
        if (pstCom == '1') 
            {
             valor = 1 * contador;
            }
        if (pstCom == '2') 
            {
             valor = 2 * contador;
            }
        if (pstCom == '3') 
            {
             valor = 3 * contador;
            }
        if (pstCom == '4') 
            {
             valor = 4 * contador;
            }
        if (pstCom == '5') 
            {
             valor = 5 * contador;
            }
        if (pstCom == '6') 
            {
             valor = 6 * contador;
            }
        if (pstCom == '7') 
            {
             valor = 7 * contador;
            }
        if (pstCom == '8') 
            {
             valor = 8 * contador;
            }
        if (pstCom == '9') 
            {
             valor = 9 * contador;
            }
        if (pstCom == 'A') 
            {
             valor = 10 * contador;
            }
        if (pstCom == 'B') 
            {
             valor = 11 * contador;
            }
        if (pstCom == 'C') 
            {
             valor = 12 * contador;
            }
        if (pstCom == 'D') 
            {
             valor = 13 * contador;
            }
        if (pstCom == 'E') 
            {
             valor = 14 * contador;
            }
        if (pstCom == 'F') 
            {
             valor = 15 * contador;
            }
        if (pstCom == 'G') 
            {
             valor = 16 * contador;
            }
        if (pstCom == 'H') 
            {
             valor = 17 * contador;
            }
        if (pstCom == 'I') 
            {
             valor = 18 * contador;
            }
        if (pstCom == 'J') 
            {
             valor = 19 * contador;
            }
        if (pstCom == 'K') 
            {
             valor = 20 * contador;
            }
        if (pstCom == 'L') 
            {
             valor = 21 * contador;
            }
        if (pstCom == 'M') 
            {
             valor = 22 * contador;
            }
        if (pstCom == 'N') 
            {
             valor = 23 * contador;
            }
        if (pstCom == 'Ñ') 
            {
             valor = 24 * contador;
            }
        if (pstCom == 'O') 
            {
             valor = 25 * contador;
            }
        if (pstCom == 'P') 
            {
             valor = 26 * contador;
            }
        if (pstCom == 'Q') 
            {
             valor = 27 * contador;
            }
        if (pstCom == 'R') 
            {
             valor = 28 * contador;
            }
        if (pstCom == 'S') 
            {
             valor = 29 * contador;
            }
        if (pstCom == 'T') 
            {
             valor = 30 * contador;
            }
        if (pstCom == 'U') 
            {
             valor = 31 * contador;
            }
        if (pstCom == 'V') 
            {
             valor = 32 * contador;
            }
        if (pstCom == 'W') 
            {
             valor = 33 * contador;
            }
        if (pstCom == 'X') 
            {
             valor = 34 * contador;
            }
        if (pstCom == 'Y') 
            {
             valor = 35 * contador;
            }

        if (pstCom == 'Z') 
            {
             valor = 36 * contador;
            }

        contador  = contador - 1;
        contador1 = contador1 + 1;
        sumatoria = sumatoria + valor;

    }

numVer  = sumatoria % 10;
numVer  = Math.abs(10 - numVer);
anio = dfecha.substr(2,2);


if (numVer == 10)
    {
     numVer = 0;
    }


if (anio < 2000)
    {
     pstDigVer = '0' + '' + numVer;
    }
if (anio >= 2000)
    {
     pstDigVer = 'A' + '' + numVer;
    }

pstCURP = pstCURP + pstDigVer;

        document.getElementById("curp").value = pstCURP;
    return pstCURP
} // End if