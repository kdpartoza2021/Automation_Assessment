import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
    selectedItemName?: string;
}

setWorldConstructor(CustomWorld);
export default CustomWorld;
