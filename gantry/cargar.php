<?php

$mipVa = $_POST['mipVa'];
$mipId = $_POST['mipId'];
$copiarde = $_POST['copiarde'];
$armoniaValor = $_POST['armoniaVa'];
$armoniaId = $_POST['armoniaId'];

$ficherocustom = 'mispresets/'.$mipVa.'.yaml';
$fichero = "plantillas/$armoniaId/$armoniaValor.yaml";

echo $nombreCustom = $copiarde;
if (file_exists('plantillas/monocromatico/'.$nombreCustom.'.yaml')) {
    $armoniaCustom = 'monocromatico';

} elseif (file_exists('plantillas/analogo/'.$nombreCustom.'.yaml')) {
    $armoniaCustom = 'analogo';

} elseif (file_exists('plantillas/triada/'.$nombreCustom.'.yaml')) {
    $armoniaCustom = 'triada';

} elseif (file_exists('plantillas/complementario/'.$nombreCustom.'.yaml')) {
    $armoniaCustom = 'complementario';

} elseif (file_exists('plantillas/comple_dividido/'.$nombreCustom.'.yaml')) {
    $armoniaCustom = 'comple_dividido';

} elseif (file_exists('plantillas/tatradica/'.$nombreCustom.'.yaml')) {
    $armoniaCustom = 'tatradica';

}

$rutaCustom = 'plantillas/'.$armoniaCustom.'/'.$nombreCustom.'.yaml';



if (isset($armoniaValor)) {
    if (file_exists($fichero)) {
        copy($fichero, 'presets.yaml');

    } else {
        copy('base.yaml', $fichero);

    }

// custom
} elseif (isset($mipVa)) {
    if (file_exists($ficherocustom)) {
        copy($ficherocustom, 'presets.yaml');

    }
     else {
       if ($copiarde == '') {
         copy('base.yaml', $ficherocustom);
       } else {
         copy($rutaCustom, $ficherocustom);
       }



    }
}
