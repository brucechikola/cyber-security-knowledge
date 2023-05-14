import Execute from "api/axios/Execute";
import { API_CONFIG } from "api/config";

export function Unique(length = 30) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export const IsObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0
}

export const GetProvinces = async (headers) => {
    return new Execute().get({
        endpoint_extension: API_CONFIG.endpoint_extensions.provinces,
        headers: headers
    }).then(resolve => {
        if (resolve.status && resolve.data.length > 0) {
            const d = resolve.data.map(l => {
                return {
                    label: l.attributes.province,
                    value: l.id
                }
            })
            return d
        }
        else {
            return []
        }
    })
}


export const GetLocations = async (headers) => {
    return new Execute().get({
        endpoint_extension: API_CONFIG.endpoint_extensions.locations,
        headers: headers
    }).then(resolve => {
        if (resolve.status && resolve.data.length > 0) {
            const d = resolve.data.map(l => {
                return {
                    id: l.id,
                    location: l.attributes.location,
                    latitude: l.attributes.latitude,
                    longitude: l.attributes.longitude,
                    province: l.attributes.province.data.attributes.province,
                    criminal_activities: l.attributes?.criminal_activities?.data?.map(ca => {
                        return {
                            id: ca.id,
                            type: ca?.attributes?.criminal_activity_type?.data?.attributes?.type,
                            icon: ca?.attributes?.criminal_activity_type?.data?.attributes?.icon,
                            location: l.attributes.location,
                            description: ca?.attributes?.description,
                            date: ca?.attributes?.date,
                            time: ca?.attributes?.time
                        }
                    })
                }
            })
            return d
        }
        else {
            return []
        }
    })
}
export const GetCrimeTypes = async (headers) => {
    return new Execute().get({
        endpoint_extension: API_CONFIG.endpoint_extensions.criminal_activity_types,
        headers: headers
    }).then(resolve => {
        if (resolve.status && resolve.data.length > 0) {
            const d = resolve.data.map(ct => {
                return {
                    id: ct.id,
                    type: ct.attributes.type,
                    description: ct.attributes.description,
                    icon: ct.attributes.icon,
                    criminal_activities: ct.attributes?.criminal_activities?.data?.map(ca => {
                        return {
                            id: ca.id,
                            type: ct.attributes.type,
                            location: ca?.attributes?.location?.data?.attributes?.location,
                            description: ca?.attributes?.description,
                            date: ca?.attributes?.date,
                            time: ca?.attributes?.time
                        }
                    })
                }
            })
            return d
        }
        else {
            return []
        }
    })
}
export const GetCriminalActivities = async (headers) => {
    return new Execute().get({
        endpoint_extension: API_CONFIG.endpoint_extensions.criminal_activities,
        headers: headers
    }).then(resolve => {
        if (resolve.status && resolve.data.length > 0) {
            const d = resolve.data.map(ca => {
                return {
                    id: ca?.id,
                    type: ca?.attributes?.criminal_activity_type?.data?.attributes?.type,
                    location: ca?.attributes?.location?.data?.attributes?.location,
                    description: ca.attributes.description,
                    date: ca?.attributes?.date,
                    time: ca?.attributes?.time,
                }
            })
            return d
        }
        else {
            return []
        }
    })
}

export const DeleteEntry = async (headers, id, endpoint) => {
    return new Execute().delete({
        id: id,
        headers: headers,
        endpoint_extension: endpoint
    }).then(resolve => {
        return resolve
    })
}



export const DownloadReport = (data) => {
    const csvString = `SN,Crime Type,Location,Description,Date,Time\n` + data.map(d => `${d.sn},${d.type},${d.location},${d.description},${d.date},${d.time}`).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString));
    link.setAttribute('download', 'Criminal Activities Report.csv');
    document.body.appendChild(link);
    link.click();
}