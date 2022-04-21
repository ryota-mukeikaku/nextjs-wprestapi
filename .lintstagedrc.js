const { CLIEngine } = require('eslint')

const cli = new CLIEngine({})

module.exports = {
    // '(components|layouts|libs|manuscripts|pages|types|utils)/**/*.(js|ts)?(x)':
    //     (files) => {
    //         const unignoredFiles = files.filter(
    //             (file) => !cli.isPathIgnored(file)
    //         )
    //         const joinedUnignoredFiles = files.join(' ')
    //         const values = []
    //         if (joinedUnignoredFiles) {
    //             values.push(`next lint --fix --file ${joinedUnignoredFiles}`)
    //         }
    //         return values
    //     },
    'styles/**/*.{scss,css}': (files) => {
        const joinedUnignoredFiles = files.join(' ')
        const values = []
        if (joinedUnignoredFiles) {
            values.push(`prettier -w ${joinedUnignoredFiles}`)
            values.push(`stylelint --fix ${joinedUnignoredFiles}`)
        }
        return values
    }
}
