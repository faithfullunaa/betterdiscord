/**
 * @name TooLewdForDiscord
 * @description You and I both know that this isn't going to be used for educational purposes...
 * @version 0.0.3
 * 
 * @author bluebewwy
 * @authorId 268199041542651904
 * @authorLink https://github.com/bluebewwy
 * @invite NCxZSpMsKM
 * 
 * @source https://github.com/bluebewwy/betterdiscord/TooLewdForDiscord.plugin.js
 * @updateUrl https://raw.githubusercontent.com/bluebewwy/betterdiscord/main/TooLewdForDiscord.plugin.js
 */

/*@cc_on
@if (@_jscript)
    
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else@*/

var TooLewdForDiscord = (() => {
var out = { tlfd_log: (message) => { console.log(`%cTooLewdForDiscord$%c${message}`, `color:#FFC0CB;font-weight:bold`, "") } }

var loaded = false;

function tlfd_init(final) {
    loaded = true;
    out.tlfd_log(" {INIT}: Initialised.");
    return 0; // Success
}

function tlfd_exit(final) {
    loaded = false;
    out.tlfd_log(" {INIT}: Exit.");
    return 0;
}

function tlfd_update() {
    var currentUser = BdApi.findModuleByProps("getCurrentUser").getCurrentUser();
    if (typeof currentUser === "undefined") return;
    currentUser.nsfwAllowed = loaded;
}

function tlfd_start() {
    if (!loaded && tlfd_init(true) !== 0) return;

    tlfd_update();
}

function tlfd_stop() {
    if (!loaded) return;

    loaded = false;
    tlfd_update();
    tlfd_exit(true);
}

return function() { return {

    // Functions used by the BetterDiscord API for displaying plugins to the user.
    getName       : () => "TooLewdForDiscord",
    getDescription: () => "You and I both know that this isn't going to be used for the most educational purposes...",
    getVersion    : () => "0.0.3",
    getAuthor     : () => "bluebewwy",

    start: tlfd_start,
    stop: tlfd_stop
}};

})();

module.exports = TooLewdForDiscord;

/*@end @*/
