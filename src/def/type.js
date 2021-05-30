export const FieldType = {
    NUMBER: "NUMBER",
    TEXT: "TEXT",
    NAME: "NAME",
    UID: "UID",
    URL: "URL",
    DROPDOWN: "DROPDOWN",
    ICON_DROPDOWN: "ICON_DROPDOWN"
}

export const PlaceholderValue = {
    MIN_NUMBER: 0,
    MAX_NUMBER: 999,
    NONE: "",
}

export const ObjectType = {
    HYPERLINK: "Hyperlink Widget",
}

export const IconType = {
    DEFAULT: "DEFAULT",
    FACEBOOK: "FACEBOOK",
    TWITTER: "TWITTER",
    JIRA: "JIRA",
    GITHUB: "GITHUB",
    SLACK: "SLACK",
    INSTAGRAM: "INSTAGRAM",
    EMAIL: "EMIAL",
}

export const HyperlinkObject = {
    title: ObjectType.HYPERLINK,
    params: [
        {
            name: "id",
            type: FieldType.UID,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Size",
            type: FieldType.NUMBER,
            defaultValue: 1,
        },
        {
            name: "Name",
            type: FieldType.NAME,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Url",
            type: FieldType.URL,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Icon",
            type: FieldType.ICON_DROPDOWN,
            defaultValue: PlaceholderValue.NONE,
        },
    ]
}

export const ResourceObject = {
    title: "Resource Objects",
    params: [
        {
            name: "id",
            type: FieldType.UID,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Order",
            type: FieldType.NUMBER,
            defaultValue: PlaceholderValue.MIN_NUMBER,
        },
        {
            name: "Name",
            type: FieldType.NAME,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Icon",
            type: FieldType.URL,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Initial Amount",
            type: FieldType.NUMBER,
            defaultValue: PlaceholderValue.MIN_NUMBER,
        },
        {
            name: "Max Amount",
            type: FieldType.NUMBER,
            defaultValue: PlaceholderValue.MAX_NUMBER,
        }
    ]
}

export const AccumulatorObject = {
    title: "Accumulator Objects",
    params: [
        {
            name: "id",
            type: FieldType.UID,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Order",
            type: FieldType.NUMBER,
            defaultValue: PlaceholderValue.MIN_NUMBER,
        },
        {
            name: "Name",
            type: FieldType.NAME,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Icon",
            type: FieldType.URL,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Initial Amount",
            type: FieldType.NUMBER,
            defaultValue: PlaceholderValue.MIN_NUMBER,
        },
        {
            name: "Max Amount",
            type: FieldType.NUMBER,
            defaultValue: PlaceholderValue.MAX_NUMBER,
        },
        {
            name: "Product Id",
            type: FieldType.UID,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Product Amount",
            type: FieldType.NUMBER,
            defaultValue: PlaceholderValue.MIN_NUMBER,
        },
    ]
}

export const QuestObject = {
    title: "Quest Objects",
    params: [
        {
            name: "id",
            type: FieldType.UID,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Order",
            type: FieldType.NUMBER,
            defaultValue: PlaceholderValue.MIN_NUMBER,
        },
        {
            name: "Name",
            type: FieldType.NAME,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Icon",
            type: FieldType.URL,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Objective Type",
            type: FieldType.URL,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Objective Id",
            type: FieldType.UID,
            defaultValue: PlaceholderValue.NONE,
        },
        {
            name: "Objective Amount",
            type: FieldType.NUMBER,
            defaultValue: PlaceholderValue.MIN_NUMBER,
        },
    ]
}

export const Objects = [HyperlinkObject];

//export const Objects = [ResourceObject, AccumulatorObject, QuestObject];