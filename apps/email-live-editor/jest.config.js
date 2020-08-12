module.exports = {
    name: 'email-live-editor',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/apps/email-live-editor',
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js',
    ],
};
