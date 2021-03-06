// Demisto script for LimaCharlie
var before = Math.round((new Date()).getTime() / 1000).toString();
var days = (args.days) ? args.days : 1;
var after = (before - days * 24 * 60 * 60).toString();
var size = (args.size) ? args.size : '4096';

var r = executeCommand('timeline', {before: before, after: after, sensor_id: args.sensor, max_size: size});

if (r && Array.isArray(r) && r.length === 1 && r[0].ContentsFormat === formats.json && r[0].Contents && r[0].Contents.events) {
    var res = {Contents: [], ContentsFormat: formats.table, Type: entryTypes.note};
    for (var i=0; i<r[0].Contents.events.length; i++) {
        if (r[0].Contents.events[i][1] === 'notification.NEW_PROCESS') {
            var newProcess = r[0].Contents.events[i][3]['notification.NEW_PROCESS'];
            var ts = newProcess['base.TIMESTAMP'];
            var pid = newProcess['base.PROCESS_ID'];
            var path = newProcess['base.FILE_PATH'];
            var cmdline = newProcess['base.COMMAND_LINE'];
            var threads = newProcess['base.THREADS'];
            var ppid = newProcess['base.PARENT_PROCESS_ID'];
            var base = newProcess['base.BASE_ADDRESS'];
            res.Contents.push({
                Timestamp: ts ? (new Date(ts * 1000)).toString() : '',
                PID: pid ? pid.toString() : '',
                Path: path ? path : '',
                Cmdline: cmdline ? cmdline : '',
                Threads: threads ? threads.toString() : '',
                PPID: ppid ? ppid.toString() : '',
                BaseAddr: base ? '0x' + base.toString(16) : ''
            });
        }
    }
    if (res.Contents.length > 0) {
        return res;
    }
}

return r;
