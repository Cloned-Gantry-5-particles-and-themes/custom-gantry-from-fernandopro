
function custom_presets() {
  var mipVa = document.getElementById('custom_presets').value;
  var mipId = jQuery('#custom_presets').attr('id');
  var copiardeText = jQuery('#copiarde').text();
  var url = "templates/g5_hydrogen/custom/gantry/cargar.php";
  jQuery.ajax({
    type: "post",
    url: url,
    data: {
      mipVa: mipVa,
      mipId: mipId,
      copiarde: copiardeText
    },
    success: function(datos) {
      jQuery("#mostrarcustom").html(
      '<i class="fa fa-file-text-o"></i>' + ' '+
        mipVa
      );
      jQuery("a#cargacustom").attr('href', '/?presets=' + mipVa);
      jQuery("#mostrarcustom").addClass('button button-presets');
    }
  });
}


function cargar_monocromatico() {
  var monoVa = document.getElementById('monocromatico').value;
  var monoId = jQuery('#monocromatico').attr('id');
  var url = "templates/g5_hydrogen/custom/gantry/cargar.php";
  jQuery.ajax({
    type: "post",
    url: url,
    data: {
      armoniaVa: monoVa,
      armoniaId: monoId
    },
    success: function(datos) {
      jQuery("#mostrarP_mono").html(
        '<img src="templates/g5_hydrogen/custom/images/armonias/monocromatico.png">' +
        '&nbsp;&nbsp;' +
        monoVa
      );
      jQuery("a#cargaPreset_mono").attr('href', '/?presets=' + monoVa);
      jQuery("#mostrarP_mono").addClass('button button-presets');

    }
  });
}

function cargar_analogo() {
  var analogoVa = document.getElementById('analogo').value;
  var analogoId = jQuery('#analogo').attr('id');
  var url = "templates/g5_hydrogen/custom/gantry/cargar.php";
  jQuery.ajax({
    type: "post",
    url: url,
    data: {
      armoniaVa: analogoVa,
      armoniaId: analogoId
    },
    success: function(datos) {
      jQuery("#mostrarP_analogo").html(
        '<img src="templates/g5_hydrogen/custom/images/armonias/analogo.png">' +
        '&nbsp;&nbsp;' +
        analogoVa
      );
      jQuery("a#cargaPreset_analogo").attr('href', '/?presets=' + analogoVa);
      jQuery("#mostrarP_analogo").addClass('button button-presets');

    }
  });
}

function cargar_triada() {
  var triadaVa = document.getElementById('triada').value;
  var triadaId = jQuery('#triada').attr('id');
  var url = "templates/g5_hydrogen/custom/gantry/cargar.php";
  jQuery.ajax({
    type: "post",
    url: url,
    data: {
      armoniaVa: triadaVa,
      armoniaId: triadaId
    },
    success: function(datos) {
      jQuery("#mostrarP_triada").html(
        '<img src="templates/g5_hydrogen/custom/images/armonias/triada.png">' +
        '&nbsp;&nbsp;' +
        triadaVa
      );
      jQuery("a#cargaPreset_triada").attr('href', '/?presets=' + triadaVa);
      jQuery("#mostrarP_triada").addClass('button button-presets');

    }
  });
}

function cargar_complementario() {
  var complementarioVa = document.getElementById('complementario').value;
  var complementarioId = jQuery('#complementario').attr('id');
  var url = "templates/g5_hydrogen/custom/gantry/cargar.php";
  jQuery.ajax({
    type: "post",
    url: url,
    data: {
      armoniaVa: complementarioVa,
      armoniaId: complementarioId
    },
    success: function(datos) {
      jQuery("#mostrarP_complementario").html(
        '<img src="templates/g5_hydrogen/custom/images/armonias/complementario.png">' +
        '&nbsp;&nbsp;' +
        complementarioVa
      );
      jQuery("a#cargaPreset_complementario").attr('href', '/?presets=' + complementarioVa);
      jQuery("#mostrarP_complementario").addClass('button button-presets');

    }
  });
}

function cargar_comple_dividido() {
  var comple_divididoVa = document.getElementById('comple_dividido').value;
  var comple_divididoId = jQuery('#comple_dividido').attr('id');
  var url = "templates/g5_hydrogen/custom/gantry/cargar.php";
  jQuery.ajax({
    type: "post",
    url: url,
    data: {
      armoniaVa: comple_divididoVa,
      armoniaId: comple_divididoId
    },
    success: function(datos) {
      jQuery("#mostrarP_comple_dividido").html(
        '<img src="templates/g5_hydrogen/custom/images/armonias/comple_dividido.png">' +
        '&nbsp;&nbsp;' +
        comple_divididoVa
      );
      jQuery("a#cargaPreset_comple_dividido").attr('href', '/?presets=' + comple_divididoVa);
      jQuery("#mostrarP_comple_dividido").addClass('button button-presets');

    }
  });
}

function cargar_tetradica() {
  var tetradicaVa = document.getElementById('tetradica').value;
  var tetradicaId = jQuery('#tetradica').attr('id');
  var url = "templates/g5_hydrogen/custom/gantry/cargar.php";
  jQuery.ajax({
    type: "post",
    url: url,
    data: {
      armoniaVa: tetradicaVa,
      armoniaId: tetradicaId
    },
    success: function(datos) {
      jQuery("#mostrarP_tetradica").html(
        '<img src="templates/g5_hydrogen/custom/images/armonias/tetradica.png">' +
        '&nbsp;&nbsp;' +
        tetradicaVa
      );
      jQuery("a#cargaPreset_tetradica").attr('href', '/?presets=' + tetradicaVa);
      jQuery("#mostrarP_tetradica").addClass('button button-presets');

    }
  });
}
