/**
 * @name TooLewdForDiscord
 * @author cozy fun#6288
 * @version 0.0.2
 * @description You and I both know that this isn't going to be used for educational purposes...
 * @source null
 * @updateUrl null
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

var init = false;

function tlfd_init(final) {
    out.tlfd_log(" {INIT}: Initialised.");
    return 0; // Success
}

function tlfd_exit(final) {
    init = false;
    out.tlfd_log(" {INIT}: Exit.");
    return 0;
}

function tlfd_update(state) {
    var currentUser = BdApi.findModuleByProps("getCurrentUser").getCurrentUser();
    if (typeof currentUser === "undefined") return;
    currentUser.nsfwAllowed = state;
}

function tlfd_start() {
    if (!init && tlfd_init(true) !== 0) return;

    tlfd_update(init);
}

function tlfd_stop() {
    if (!init) return;

    init = false;
    tlfd_update(false);
    tlfd_exit(true);
}

function tlfd_load() {
    init = true
    tlfd_start();
}

function tlfd_unload() {
    init = false
    tlfd_stop();
}

function tlfd_switch() {
    tlfd_update(init);
}

return function() { return {

    // Functions used by the BetterDiscord API for displaying plugins to the user.
    getName       : () => "TooLewdForDiscord",
    getDescription: () => "You and I both know that this isn't going to be used for the most educational purposes...",
    getVersion    : () => "0.0.2",
    getAuthor     : () => "cozy fun#6288",

    start: tlfd_start,
    stop: tlfd_stop,
    load: tlfd_load,
    unload: tlfd_unload,
    onSwitch: tlfd_switch
}};

})();

module.exports = TooLewdForDiscord;

/*@end @*/
