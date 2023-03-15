import {IMAGE_REPOSITORY} from "../../constants";
import {Image} from "./image.model";


export const ImageProviders = [{
    provide: IMAGE_REPOSITORY,
    useValue: Image,
}];
