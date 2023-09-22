import axios from "axios";

export default class ConfigurationSettingsService{

    static baseUrl = process.env.NEXT_PUBLIC_API_URL;

    static async getAllParameters(token : string){
        return await axios.get( this.baseUrl + '/getAllParameters', {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `${token}`
            }
        });
    }

    static async createParameter(token: string, parameter : {
        parameter_key: string,
        value: string,
        description: string,
        create_date: string
    }){

        return await axios.post(this.baseUrl + '/addParameter', parameter, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    static async deleteParameter(token: string, id: string){
        return await axios.post(this.baseUrl + '/deleteParameter', {"id" : id}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    static async updateParameter(token: string, id: string, parameter : {
        parameter_key: string,
        value: string,
        description: string,
        create_date: string
    }){

        return await axios.post(this.baseUrl + '/updateParameter', {"id" : id, "parameter" : parameter}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}