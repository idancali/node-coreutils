const spawn = require("child_process").spawn
const logger = require("./logger")

const run = {

    async: function (cmd, args) {
        var proc = spawn(cmd, args);

        proc.stdout.on('data', (data) => {
            logger.info(data);
        });

        proc.stderr.on('data', (data) => {
            logger.fail(cmd + " failed: " + data)
        });

        proc.on('close', (code) => {
            logger.done("↳ Done");
        });
    }, 

    npm: function (args) {
        run.async("npm", args)
    },

    npmInstall: function (name, dir) {
        var args = ["install"]

        if (dir) {
            args.push("--prefix")
            args.push(dir)
        }

        args.push("--save")
        args.push(name)

        run.npm(args)
    },

    reactNative: function(args) {
        run.async("react-native", args)
    },

    reactNativeRun: function(platform) {
        run.reactNative(["run-" + platform])
    }
}

module.exports = run