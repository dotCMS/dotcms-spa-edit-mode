import transformPage from '../utils/transformPage';

const PAGE_MOCK = {
    template: {
        template: false,
        permissionId: '4341f0fd-a456-4d77-83da-a5cd7248624d',
        modDate: 1546623700694,
        canEdit: true,
        source: 'DB',
        type: 'template',
        title: 'anonymous_layout_1546623700681',
        showOnMenu: false,
        inode: 'b68e99fd-0060-4995-996a-6880d1fcc657',
        archived: false,
        working: true,
        theme: '79479e0e-87d0-4260-9c12-3f05e303adcc',
        locked: false,
        friendlyName: '',
        drawedBody:
            '{"header":true,"footer":true,"body":{"rows":[{"columns":[{"containers":[{"identifier":"5363c6c6-5ba0-4946-b7af-cf875188ac2e","uuid":"1"}],"widthPercent":50,"leftOffset":1,"preview":false,"width":6,"left":0},{"containers":[{"identifier":"56bd55ea-b04b-480d-9e37-5d6f9217dcc3","uuid":"1"}],"widthPercent":25,"leftOffset":7,"preview":false,"width":3,"left":6},{"containers":[{"identifier":"5eb11b21-6b13-4fb8-a823-1de20bba56c0","uuid":"1"}],"widthPercent":25,"leftOffset":10,"preview":false,"width":3,"left":9}],"identifier":0}]},"sidebar":{"containers":[],"location":"","width":"small","widthPercent":20,"preview":false}}',
        live: false,
        iDate: 1528921595705,
        owner: '',
        versionType: 'template',
        identifier: '4341f0fd-a456-4d77-83da-a5cd7248624d',
        image: '',
        permissionType: 'com.dotmarketing.portlets.templates.model.Template',
        new: false,
        idate: 1528921595705,
        versionId: '4341f0fd-a456-4d77-83da-a5cd7248624d',
        deleted: false,
        modUser: 'dotcms.org.1',
        sortOrder: 0,
        name: 'anonymous_layout_1546623700681',
        anonymous: true,
        drawed: true,
        categoryId: 'b68e99fd-0060-4995-996a-6880d1fcc657'
    },
    layout: {
        layout: null,
        footer: true,
        sidebar: {
            preview: false,
            widthPercent: 20,
            width: 'small',
            containers: [],
            location: ''
        },
        width: null,
        header: true,
        title: 'anonymouslayout1546623700681',
        body: {
            rows: [
                {
                    identifier: 0,
                    columns: [
                        {
                            preview: false,
                            widthPercent: 50,
                            left: 0,
                            width: 2,
                            leftOffset: 1,
                            containers: [
                                {
                                    identifier: '5363c6c6-5ba0-4946-b7af-cf875188ac2e',
                                    uuid: '1'
                                }
                            ]
                        },
                        {
                            preview: false,
                            widthPercent: 25,
                            left: 5,
                            width: 3,
                            leftOffset: 6,
                            containers: [
                                {
                                    identifier: '56bd55ea-b04b-480d-9e37-5d6f9217dcc3',
                                    uuid: '1'
                                }
                            ]
                        },
                        {
                            preview: false,
                            widthPercent: 25,
                            left: 9,
                            width: 3,
                            leftOffset: 10,
                            containers: [
                                {
                                    identifier: '5eb11b21-6b13-4fb8-a823-1de20bba56c0',
                                    uuid: '1'
                                }
                            ]
                        }
                    ],
                    id: null,
                    value: null
                }
            ]
        },
        pageWidth: null
    },
    site: {
        parent: true,
        permissionId: '48190c8c-42c4-46af-8d1a-0cd5db894797',
        modDate: 1546618754689,
        aliases: 'test.dotcms.com\ntest2.dotcms.com\ntest3.dotcms.com',
        keyValue: false,
        indexPolicy: 'DEFER',
        contentTypeId: '855a2d72-f2f3-4169-8b04-ac5157c4380c',
        nextReview: null,
        htmlpage: false,
        type: 'contentlet',
        title: 'demo.dotcms.com',
        inode: '1a3ea7ac-05a4-47c8-a876-53844224305e',
        archived: false,
        default: true,
        hostname: 'demo.dotcms.com',
        vanityUrl: false,
        host: 'SYSTEM_HOST',
        lastReview: 1546618754677,
        working: true,
        locked: false,
        contentType: {
            owner: null,
            permissionType: 'com.dotmarketing.portlets.structure.model.Structure',
            permissionId: '855a2d72-f2f3-4169-8b04-ac5157c4380c'
        },
        live: true,
        lowIndexPriority: false,
        versionType: 'host',
        owner: 'dotcms.org.1',
        hostThumbnail: null,
        permissionType: 'com.dotmarketing.portlets.contentlet.model.Contentlet',
        identifier: '48190c8c-42c4-46af-8d1a-0cd5db894797',
        new: false,
        disabledWysiwyg: [],
        languageId: 1,
        titleImage: {
            present: false
        },
        fileAsset: false,
        versionId: '48190c8c-42c4-46af-8d1a-0cd5db894797',
        folder: 'SYSTEM_FOLDER',
        structureInode: '855a2d72-f2f3-4169-8b04-ac5157c4380c',
        reviewInterval: null,
        tagStorage: '48190c8c-42c4-46af-8d1a-0cd5db894797',
        sortOrder: 0,
        modUser: 'dotcms.org.1',
        name: 'demo.dotcms.com',
        actionId: null,
        systemHost: false,
        indexPolicyDependencies: 'DEFER',
        categoryId: '1a3ea7ac-05a4-47c8-a876-53844224305e'
    },
    viewAs: {
        mode: 'EDIT_MODE',
        language: {
            country: 'United States',
            countryCode: 'US',
            language: 'English',
            id: 1,
            languageCode: 'en'
        }
    },
    containers: {
        '5eb11b21-6b13-4fb8-a823-1de20bba56c0': {
            container: {
                permissionId: '5eb11b21-6b13-4fb8-a823-1de20bba56c0',
                modDate: 1367866465976,
                code: '',
                notes: 'This container display the body field of the content type Page Content.',
                luceneQuery: '',
                source: 'DB',
                type: 'containers',
                title: 'Default 2 (Page Content)',
                showOnMenu: false,
                inode: 'a7445635-14a4-47fc-a9ae-5ff4c80acffe',
                archived: false,
                preLoop: '',
                working: true,
                locked: false,
                friendlyName: 'Displays Page Content',
                live: true,
                iDate: 1367866465953,
                owner: '',
                useDiv: false,
                versionType: 'containers',
                identifier: '5eb11b21-6b13-4fb8-a823-1de20bba56c0',
                permissionType: 'com.dotmarketing.portlets.containers.model.Container',
                new: false,
                idate: 1367866465953,
                staticify: false,
                sortContentletsBy: '',
                maxContentlets: 25,
                versionId: '5eb11b21-6b13-4fb8-a823-1de20bba56c0',
                deleted: false,
                modUser: 'dotcms.org.1',
                sortOrder: 0,
                name: 'Default 2 (Page Content)',
                categoryId: 'a7445635-14a4-47fc-a9ae-5ff4c80acffe',
                postLoop: ''
            },
            rendered: {
                'uuid-1': '<div></div>'
            },
            contentlets: {
                'uuid-1': [
                    {
                        owner: 'dotcms.org.1',
                        identifier: '4e34e8ac-4b24-4305-8fca-d85130999ee6',
                        hostName: 'demo.dotcms.com',
                        modDate: 1414795355103,
                        languageId: 1,
                        title: 'Here is a title',
                        body: 'Here is some texttest',
                        url: '/4e34e8ac-4b24-4305-8fca-d85130999ee6.content',
                        baseType: 'CONTENT',
                        inode: '5959433c-a803-4819-8f5f-f3f0599f05bc',
                        titleImage: 'N/A',
                        modUserName: 'Admin User',
                        folder: 'SYSTEM_FOLDER',
                        sortOrder: 0,
                        modUser: 'dotcms.org.1',
                        host: '48190c8c-42c4-46af-8d1a-0cd5db894797',
                        stInode: '2a3e91e4-fbbf-4876-8c5b-2233c1739b05',
                        contentType: 'webPageContent'
                    }
                ]
            },
            containerStructures: [
                {
                    code: '#dotedit($CONTENT_INODE, $body)',
                    contentTypeVar: 'webPageContent',
                    structureId: '2a3e91e4-fbbf-4876-8c5b-2233c1739b05',
                    id: '3341e77a-6129-4b38-939b-c60e08561568',
                    containerId: '5eb11b21-6b13-4fb8-a823-1de20bba56c0',
                    containerInode: 'a7445635-14a4-47fc-a9ae-5ff4c80acffe'
                }
            ]
        },
        '5363c6c6-5ba0-4946-b7af-cf875188ac2e': {
            container: {
                permissionId: '5363c6c6-5ba0-4946-b7af-cf875188ac2e',
                modDate: 1528812157912,
                code: '',
                notes:
                    '    Medium Column:\r\n    - Blog\r\n    - Events\r\n    - Generic\r\n    - Location\r\n    - Media\r\n    - News\r\n    - Documents\r\n    - Products',
                luceneQuery: '',
                source: 'DB',
                type: 'containers',
                title: 'Medium Column (md-1)',
                showOnMenu: false,
                inode: '885060ee-0f08-43bc-9147-0d4ab0aa5cbc',
                archived: false,
                preLoop: '<div class="medium-column">',
                working: true,
                locked: true,
                friendlyName: 'Medium body column container',
                live: true,
                iDate: 1528812157888,
                owner: null,
                useDiv: false,
                versionType: 'containers',
                identifier: '5363c6c6-5ba0-4946-b7af-cf875188ac2e',
                permissionType: 'com.dotmarketing.portlets.containers.model.Container',
                new: false,
                idate: 1528812157888,
                staticify: false,
                sortContentletsBy: '',
                maxContentlets: 25,
                versionId: '5363c6c6-5ba0-4946-b7af-cf875188ac2e',
                deleted: false,
                modUser: 'dotcms.org.1',
                sortOrder: 0,
                name: 'Medium Column (md-1)',
                categoryId: '885060ee-0f08-43bc-9147-0d4ab0aa5cbc',
                postLoop: '</div>'
            },
            rendered: {
                'uuid-1': '<div></div>'
            },
            contentlets: {
                'uuid-1': [
                    {
                        owner: 'dotcms.org.1',
                        identifier: '2efc77b4-a54f-479b-8a81-a133b9e6da04',
                        hostName: 'System Host',
                        modDate: 1523000130900,
                        code: '##code',
                        languageId: 1,
                        title: 'Employee Management Team',
                        url: '/2efc77b4-a54f-479b-8a81-a133b9e6da04.content',
                        widgetTitle: 'Employee Management Team',
                        baseType: 'WIDGET',
                        inode: '55cda310-c503-44d9-b028-7bcaf7b66339',
                        titleImage: 'N/A',
                        modUserName: 'Admin User',
                        folder: 'SYSTEM_FOLDER',
                        sortOrder: 0,
                        modUser: 'dotcms.org.1',
                        host: 'SYSTEM_HOST',
                        stInode: '9d8cba31-0072-4c38-96db-8b619f2b57ab',
                        contentType: 'SimpleWidget'
                    },
                    {
                        hostName: 'demo.dotcms.com',
                        modDate: 1494450449329,
                        endDate: 1501628400000,
                        description: '<div></div>',
                        recurrenceOccurs: 'monthly',
                        title: 'Technology Job Fair',
                        recurrenceDayOfWeek: 3,
                        baseType: 'CONTENT',
                        inode: '25105f18-4d1a-4be6-a78a-c42ee4c00d61',
                        host: '48190c8c-42c4-46af-8d1a-0cd5db894797',
                        recurrenceDayOfMonth: 0,
                        recurrenceStart: 1501592400000,
                        stInode: 'f6259cc9-5d78-453e-8167-efd7b72b2e96',
                        contentType: 'calendarEvent',
                        recurrenceWeekOfMonth: 1,
                        recurs: true,
                        owner: 'dotcms.org.1',
                        identifier: '5aef0c62-b7d6-4805-9e7c-77a67f4822f3',
                        noRecurrenceEnd: true,
                        urlTitle: 'technology-job-fair',
                        languageId: 1,
                        recurrenceDaysOfWeek: '1,2,3,4,5,6,7,',
                        url: '/5aef0c62-b7d6-4805-9e7c-77a67f4822f3.content',
                        titleImage: 'N/A',
                        modUserName: 'Admin User',
                        recurrenceInterval: 1,
                        folder: 'SYSTEM_FOLDER',
                        recurrenceDatesToIgnore: '1412686800000',
                        recurrenceMonthOfYear: 1,
                        sortOrder: 0,
                        modUser: 'dotcms.org.1',
                        startDate: 1501592400000
                    },
                    {
                        hostName: 'demo.dotcms.com',
                        modDate: 1494450474219,
                        endDate: 1510336800000,
                        description: '<div></div>',
                        title: 'Wealth Management Annual Client Meeting',
                        recurrenceDayOfWeek: 4,
                        baseType: 'CONTENT',
                        inode: 'da45088c-0096-4300-8c25-1a2ff07c00ae',
                        recurrenceEnd: 1494388800000,
                        host: '48190c8c-42c4-46af-8d1a-0cd5db894797',
                        recurrenceDayOfMonth: 0,
                        recurrenceStart: 1510333200000,
                        categories: 'Seminars',
                        stInode: 'f6259cc9-5d78-453e-8167-efd7b72b2e96',
                        contentType: 'calendarEvent',
                        recurrenceWeekOfMonth: 2,
                        recurs: false,
                        owner: 'dotcms.org.1',
                        identifier: '66d47ebf-7b11-4076-85b0-b6c8c373d000',
                        image: '9e885f4d-1295-4167-975b-afdab2029025',
                        noRecurrenceEnd: false,
                        urlTitle: 'wealth-management-annual-client-meeting',
                        languageId: 1,
                        recurrenceDaysOfWeek: '1,2,3,4,5,6,7,',
                        url: '/66d47ebf-7b11-4076-85b0-b6c8c373d000.content',
                        tags: 'corporate event,meeting',
                        titleImage: 'N/A',
                        modUserName: 'Admin User',
                        recurrenceInterval: 0,
                        folder: 'SYSTEM_FOLDER',
                        recurrenceMonthOfYear: 5,
                        sortOrder: 0,
                        modUser: 'dotcms.org.1',
                        startDate: 1510333200000
                    }
                ]
            },
            containerStructures: [
                {
                    code: '#dotedit($CONTENT_INODE, $body)',
                    contentTypeVar: 'webPageContent',
                    structureId: '2a3e91e4-fbbf-4876-8c5b-2233c1739b05',
                    id: '1c437426-24d8-4b23-83cf-4713b8661c47',
                    containerId: '5363c6c6-5ba0-4946-b7af-cf875188ac2e',
                    containerInode: '885060ee-0f08-43bc-9147-0d4ab0aa5cbc'
                },
                {
                    code: '##code',
                    contentTypeVar: 'Media',
                    structureId: '2182e848-0240-4931-b63d-824962b66007',
                    id: '78634168-088d-470e-bbf5-da8341dad544',
                    containerId: '5363c6c6-5ba0-4946-b7af-cf875188ac2e',
                    containerInode: '885060ee-0f08-43bc-9147-0d4ab0aa5cbc'
                },
                {
                    code: '##code',
                    contentTypeVar: 'Blog',
                    structureId: '799f176a-d32e-4844-a07c-1b5fcd107578',
                    id: 'a3009ad9-7f05-4d13-9a6f-a7d6d92af77f',
                    containerId: '5363c6c6-5ba0-4946-b7af-cf875188ac2e',
                    containerInode: '885060ee-0f08-43bc-9147-0d4ab0aa5cbc'
                },
                {
                    code: '##code',
                    contentTypeVar: 'Document',
                    structureId: 'd8262b9f-84ea-46f9-88c4-0c8959271d67',
                    id: 'b9bdbe4e-4f74-4013-af74-d472fb08efed',
                    containerId: '5363c6c6-5ba0-4946-b7af-cf875188ac2e',
                    containerInode: '885060ee-0f08-43bc-9147-0d4ab0aa5cbc'
                },
                {
                    code: '##code',
                    contentTypeVar: 'Products',
                    structureId: '9ea36ae1-7775-48ae-99fe-f4ebca03a3de',
                    id: 'ba74b40f-b4fd-4f9a-94bb-04721f198532',
                    containerId: '5363c6c6-5ba0-4946-b7af-cf875188ac2e',
                    containerInode: '885060ee-0f08-43bc-9147-0d4ab0aa5cbc'
                },
                {
                    code:
                        '<div class="media">\r\n    <span class="label label-default pull-right">Location</span>\r\n    <a href="/locations/$urlTitle" class="pull-left icon-badge">\r\n        <i class="fa fa-map-marker fa-3x"></i>\r\n    </a>\r\n    <div class="media-body">\r\n        <a href="/locations/$urlTitle">\r\n        \t<div class="media-heading">$!{title}</div>\r\n\t\t</a>\r\n\t\t<address>\r\n\t\t\t$address1\r\n\t\t\t#if ($UtilMethods.isSet($address2))\r\n\t\t\t\t$address2<br/>\r\n\t\t\t#end\r\n\t\t\t$city, \r\n\t\t\t$state $zip\r\n\t\t\t#if($country != "United States" && $country != "Canada")\r\n\t\t\t\t$country\r\n\t\t\t#end\r\n\t\t</address>\r\n\t</div>\r\n</div>\r\n\r\n<hr>',
                    contentTypeVar: 'Location',
                    structureId: 'd2a77f80-2628-4819-bfe9-e9916eb6ba70',
                    id: 'bc8000bb-0a39-40aa-8756-2d45820626d6',
                    containerId: '5363c6c6-5ba0-4946-b7af-cf875188ac2e',
                    containerInode: '885060ee-0f08-43bc-9147-0d4ab0aa5cbc'
                },
                {
                    code: '##code',
                    contentTypeVar: 'calendarEvent',
                    structureId: 'f6259cc9-5d78-453e-8167-efd7b72b2e96',
                    id: 'bd9582b2-47e1-4539-a897-c8ea6bea68cb',
                    containerId: '5363c6c6-5ba0-4946-b7af-cf875188ac2e',
                    containerInode: '885060ee-0f08-43bc-9147-0d4ab0aa5cbc'
                },
                {
                    code: '##code',
                    contentTypeVar: 'News',
                    structureId: '28039964-5615-4ccf-bb96-ded62adbcc6a',
                    id: 'd6ba8c58-badb-4f9c-8548-550b8103d177',
                    containerId: '5363c6c6-5ba0-4946-b7af-cf875188ac2e',
                    containerInode: '885060ee-0f08-43bc-9147-0d4ab0aa5cbc'
                }
            ]
        },
        '56bd55ea-b04b-480d-9e37-5d6f9217dcc3': {
            container: {
                permissionId: '56bd55ea-b04b-480d-9e37-5d6f9217dcc3',
                modDate: 1523037174418,
                code: '',
                notes:
                    '    Large Column:\r\n    - Blog\r\n    - Events\r\n    - Generic\r\n    - Location\r\n    - Media\r\n    - News\r\n    - Documents\r\n    - Products',
                luceneQuery: '',
                source: 'DB',
                type: 'containers',
                title: 'Large Column (lg-1)',
                showOnMenu: false,
                inode: 'e58e92b3-7135-461b-b56b-04ff143a389b',
                archived: false,
                preLoop: '<div class="large-column">',
                working: true,
                locked: true,
                friendlyName: 'Large body column container',
                live: true,
                iDate: 1523037174390,
                owner: null,
                useDiv: false,
                versionType: 'containers',
                identifier: '56bd55ea-b04b-480d-9e37-5d6f9217dcc3',
                permissionType: 'com.dotmarketing.portlets.containers.model.Container',
                new: false,
                idate: 1523037174390,
                staticify: false,
                sortContentletsBy: '',
                maxContentlets: 25,
                versionId: '56bd55ea-b04b-480d-9e37-5d6f9217dcc3',
                deleted: false,
                modUser: 'dotcms.org.1',
                sortOrder: 0,
                name: 'Large Column (lg-1)',
                categoryId: 'e58e92b3-7135-461b-b56b-04ff143a389b',
                postLoop: '</div>'
            },
            rendered: {
                'uuid-1': '<div></div>'
            },
            contentlets: {
                'uuid-1': [
                    {
                        owner: 'dotcms.org.1',
                        identifier: '767509b1-2392-4661-a16b-e0e31ce27719',
                        hostName: 'demo.dotcms.com',
                        modDate: 1532452228269,
                        languageId: 1,
                        title: 'About Quest',
                        body: '<div></div>',
                        url: '/767509b1-2392-4661-a16b-e0e31ce27719.content',
                        baseType: 'CONTENT',
                        inode: 'f6406747-0220-41fb-86e4-32bce21a8822',
                        titleImage: 'N/A',
                        modUserName: 'Admin User',
                        folder: 'SYSTEM_FOLDER',
                        sortOrder: 0,
                        modUser: 'dotcms.org.1',
                        host: '48190c8c-42c4-46af-8d1a-0cd5db894797',
                        stInode: '2a3e91e4-fbbf-4876-8c5b-2233c1739b05',
                        contentType: 'webPageContent'
                    }
                ]
            },
            containerStructures: [
                {
                    code: '##code',
                    contentTypeVar: 'Document',
                    structureId: 'd8262b9f-84ea-46f9-88c4-0c8959271d67',
                    id: '1a19a392-9a0a-4598-8d03-d6f88d4bda5d',
                    containerId: '56bd55ea-b04b-480d-9e37-5d6f9217dcc3',
                    containerInode: 'e58e92b3-7135-461b-b56b-04ff143a389b'
                },
                {
                    code: '##code',
                    contentTypeVar: 'Blog',
                    structureId: '799f176a-d32e-4844-a07c-1b5fcd107578',
                    id: '21af915b-24a2-4077-bd7b-6aa5b42cb534',
                    containerId: '56bd55ea-b04b-480d-9e37-5d6f9217dcc3',
                    containerInode: 'e58e92b3-7135-461b-b56b-04ff143a389b'
                },
                {
                    code: '#dotedit($CONTENT_INODE, $body)\r\n',
                    contentTypeVar: 'webPageContent',
                    structureId: '2a3e91e4-fbbf-4876-8c5b-2233c1739b05',
                    id: '4ca9a141-31bb-4b17-9077-9b602e7d5bd0',
                    containerId: '56bd55ea-b04b-480d-9e37-5d6f9217dcc3',
                    containerInode: 'e58e92b3-7135-461b-b56b-04ff143a389b'
                },
                {
                    code: '##code',
                    contentTypeVar: 'Products',
                    structureId: '9ea36ae1-7775-48ae-99fe-f4ebca03a3de',
                    id: '64983c28-1094-454e-a286-e9bfae4bc1c0',
                    containerId: '56bd55ea-b04b-480d-9e37-5d6f9217dcc3',
                    containerInode: 'e58e92b3-7135-461b-b56b-04ff143a389b'
                },
                {
                    code: '##code',
                    contentTypeVar: 'News',
                    structureId: '28039964-5615-4ccf-bb96-ded62adbcc6a',
                    id: '8ff2ce3b-ba14-4251-84ed-aff6fba096ad',
                    containerId: '56bd55ea-b04b-480d-9e37-5d6f9217dcc3',
                    containerInode: 'e58e92b3-7135-461b-b56b-04ff143a389b'
                },
                {
                    code: '##code',
                    contentTypeVar: 'Media',
                    structureId: '2182e848-0240-4931-b63d-824962b66007',
                    id: 'a7e5ab8e-9f9b-4963-854e-c5acdf2fa407',
                    containerId: '56bd55ea-b04b-480d-9e37-5d6f9217dcc3',
                    containerInode: 'e58e92b3-7135-461b-b56b-04ff143a389b'
                },
                {
                    code: '##code',
                    contentTypeVar: 'calendarEvent',
                    structureId: 'f6259cc9-5d78-453e-8167-efd7b72b2e96',
                    id: 'c61f824f-d6ec-41e9-b3f4-acf920ecdf24',
                    containerId: '56bd55ea-b04b-480d-9e37-5d6f9217dcc3',
                    containerInode: 'e58e92b3-7135-461b-b56b-04ff143a389b'
                },
                {
                    code: '##code',
                    contentTypeVar: 'Location',
                    structureId: 'd2a77f80-2628-4819-bfe9-e9916eb6ba70',
                    id: 'f33f2af1-2ac4-4691-b5d7-2d81f2c52d05',
                    containerId: '56bd55ea-b04b-480d-9e37-5d6f9217dcc3',
                    containerInode: 'e58e92b3-7135-461b-b56b-04ff143a389b'
                }
            ]
        }
    },
    canCreateTemplate: true,
    page: {
        template: '4341f0fd-a456-4d77-83da-a5cd7248624d',
        modDate: 1528921595723,
        metadata: 'dotCMS',
        shortyWorking: 'ad5acc23a4',
        cachettl: '0',
        canRead: true,
        pageURI: '/about-us/index',
        canEdit: true,
        title: 'About Us',
        type: 'htmlpage',
        showOnMenu: 'true',
        httpsRequired: false,
        inode: 'ad5acc23-a466-4ac6-9c76-e6a3bc1d609e',
        lockedBy: 'dotcms.org.1',
        disabledWYSIWYG: [],
        seokeywords: 'dotCMS Content Management System',
        host: '48190c8c-42c4-46af-8d1a-0cd5db894797',
        lastReview: 1526679034428,
        working: true,
        canLock: true,
        locked: true,
        lockedOn: 1546624504007,
        stInode: 'c541abb1-69b3-4bc5-8430-5e09e5239cc8',
        friendlyName: 'About Us',
        live: false,
        owner: 'dotcms.org.1',
        identifier: 'c12fe7e6-d338-49d5-973b-2d974d57015b',
        nullProperties: [],
        friendlyname: 'About Us',
        pagemetadata: 'dotCMS',
        languageId: 1,
        workingInode: 'ad5acc23-a466-4ac6-9c76-e6a3bc1d609e',
        url: 'index',
        seodescription: 'dotCMS Content Management System demo site - About Quest',
        modUserName: 'Admin User',
        folder: '1049e7fe-1553-4731-bdf9-ba069f1dc08b',
        deleted: false,
        liveInode: '5cd3b647-e465-4a6d-a78b-e834a7a7331a',
        sortOrder: 0,
        modUser: 'dotcms.org.1',
        pageUrl: 'index',
        shortyLive: '5cd3b647e4',
        lockedByName: 'Admin User'
    }
};

const PAGE_MOCK_FORMMATED = transformPage(PAGE_MOCK);

export default PAGE_MOCK_FORMMATED;

export const getFullPageLayout = () => {
    return PAGE_MOCK_FORMMATED.layout;
}

export const getMockRow = (index) => {
    return {...PAGE_MOCK_FORMMATED.layout.body.rows[index || 0]};
}
