const spawn = require("child_process").spawn
const logger = require("./logger")

const run = {

    async: function (cmd, args) {
        return new Promise((resolve, reject) => {
            var proc = spawn(cmd, args);

            proc.stdout.on('data', (data) => {
                logger.info(data);
            });

            proc.stderr.on('data', (data) => {
            });

            proc.on('close', (code) => {
                logger.done("↳ Done with code:" + code);
                resolve()
            });
        })
    }, 

    npm: function (args) {
        return run.async("npm", args)
    },

    npmInstallPackage: function (name, dir) {
        var args = ["install", "--verbose"]

        if (dir) {
            args.push("--prefix")
            args.push(dir)
        }

        args.push("--save")
        args.push(name)

        return run.npm(args)
    },

    npmInstall: function (dir) {
        var args = ["install", "--verbose"]

        if (dir) {
            args.push("--prefix")
            args.push(dir)
        }

        return run.npm(args)
    },

    reactNative: function(args) {
        return run.async("react-native", args)
    },

    reactNativeRun: function(platform) {
        return run.reactNative(["run-" + platform])
    }
}

module.exports = run