function onFormSubmit(e) //Función que recopila las respuestas en el parámetro "e" 
{
  var answer = e.response; //Asignarle la respuesta general a answer

  var items = answer.getItemResponses(); //Separa las respuestas

  var idFolderOrigin = items[0].getResponse();
  var idFolderDestiny = items[1].getResponse();

  copyFolders(idFolderOrigin, idFolderDestiny);
}

function copyFolders(idFolderOrigin, idFolderDestiny) {
  var origin = DriveApp.getFolderById(idFolderOrigin);
  var destiny = DriveApp.getFolderById(idFolderDestiny);

  copyFolderContent(origin, destiny);
}

function copyFolderContent(origin, destiny) {
  var folders = origin.getFolders();

  while (folders.hasNext()) {
    var folder = folders.next();

    if (folder.getName().toLowerCase().indexOf("hoja de") !== -1) {
      Logger.log("La carpeta " + folder.getName() + " no se copió porque su nombre contiene 'Hoja de'");
    } else {

      var newFolder = destiny.createFolder(folder.getName());
      copyFolderContent(folder, newFolder);
    }
  }

  var files = origin.getFiles();

  while (files.hasNext()) {
    var file = files.next();
    file.makeCopy(file.getName(), destiny);
  }
}
