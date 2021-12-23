<template>
  <div>
    <Toast />
    <Toast position="top-left" group="tl" />
    <Toast position="bottom-left" group="bl" />
    <Toast position="bottom-right" group="br" />

    <div class="card bg-yellow-500">
      <div class="flex flex-wrap align-items-center justify-content-center card-container yellow-container p-2">
        <Menubar :model="items">
          <template #start>
            <img alt="logo" src="..\assets\images\dock\Actions-network-connect-icon.png" height="40" class="p-mr-5" />
          </template>

          <template #end>
            <InputText placeholder="Search" type="text" />
          </template>
        </Menubar>
      </div>
    </div>
    <div class="grid mt-5">
      <div class="col-12 md:col-6 lg:col-4">
        <div class="surface-0 p-4 shadow-2 border-round">
          <div class="text-3xl font-medium text-900 mb-3">{{ login_user }}</div>
          <div class="font-medium text-500 mb-3">
            Device :{{ login_device_id }}
            <p v-if="device_online" class="text-blue-700">DEVICE ONLINE</p>
            <p v-else>DEVICE OFFLINE</p>
          </div>
        </div>

        <div class="surface-0 p-4 shadow-2 border-round">

          <Button type="button" class="p-button-outlined p-button-success ml-2 mt-2" @click="relay1Click">
            <img alt="logo" src="..\assets\images\circle-btn-on.png" width="100" height="100" />
            <span class="p-ml-2 p-text-bold">Relay 1</span>
          </Button>
          <Button type="button" class="p-button-outlined p-button-success ml-2 mt-2" @click="relay2Click">
            <img alt="logo" src="..\assets\images\circle-btn-on.png" width="100" height="100" />
            <span class="p-ml-2 p-text-bold">Relay 2</span>
          </Button>
        </div>
      </div>

      <div class="col-12 md:col-6 lg:col-8">
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-3">
            <div class="surface-0 shadow-2 p-3 border-1 border-50 border-round">
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block text-500 font-medium mb-3">Temperature</span>
                  <div class="text-900 font-medium text-xl">{{ temperature }}C - {{ humidity }}%</div>
                </div>
                <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                  <i>
                    <Button label="info" class="p-button-success p-button-text" @click="btnTempClick">
                      <img alt="temp-img" src="..\assets\images\c-temperature-folded-icon.png" />
                    </Button>
                  </i>
                </div>
              </div>
              <span class="text-green-500 font-medium">Sensor :</span>
              <span class="text-500">DHT11</span>
            </div>
          </div>
          <div class="col-12 md:col-6 lg:col-3">
            <div class="surface-0 shadow-2 p-3 border-1 border-50 border-round">
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block text-500 font-medium mb-3">Analogue Value</span>
                  <div class="text-900 font-medium text-xl">{{ analogueValue }}</div>
                </div>
                <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">                  
                  <i><img alt="temp-img" src="..\assets\images\volume-icon.png" width="48" height="48" /></i>
                </div>
              </div>
              <span class="text-green-500 font-medium">Sensor : </span>
              <span class="text-500">10K Pot</span>
            </div>
          </div>

          <div class="col-12 md:col-6 lg:col-3">
            <div class="surface-0 shadow-2 p-3 border-1 border-50 border-round">
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block text-500 font-medium mb-3">Infrared Sensor</span>
                  <div class="text-900 font-medium text-xl">{{ infraredValue }}</div>
                </div>
                <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                  <i><img alt="temp-img" src="..\assets\images\lamp-icon.png" width="48" height="48" /></i>
                </div>
              </div>
              <span class="text-green-500 font-medium">Sensor : </span>
              <span class="text-500">Infrared</span>
            </div>
          </div>

          <div class="col-12 md:col-6 lg:col-3">
            <div class="surface-0 shadow-2 p-3 border-1 border-50 border-round">
              <div class="flex flex-column">
                <div class="flex align-items-center justify-content-center mt-1">
                  <span class="text-900">LEDs</span>
                </div>
                <div class="flex align-items-center justify-content-center mt-1 mb-1">
                  <div class="grid">
                    <div class="col-6">
                      <InputSwitch v-model="checked1" class="ml-3 mt-0 mb-0" @click="InputSwitch1Click" />
                      <span class="ml-3"> LED 1</span>
                    </div>
                    <div class="col-6">
                      <InputSwitch v-model="checked2" class="ml-3 mt-0 mb-0" @click="InputSwitch2Click" />
                      <span class="ml-3"> LED 2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="surface-0 p-4 shadow-2 border-round">
          <div class="border-2 border-dashed border-300">
            <DataTable :value="rawObject" class="p-datatable-sm" :paginator="true" :rows="5">
              <template #header>
                <div>Tag Data Follow</div>
              </template>
              <Column field="tag_id" header="TAG ID" class="text-sm"></Column>
              <Column field="tag_remain" header="Remaining" class="text-sm"></Column>
              <Column field="login_device_id" header="Toy ID" class="text-sm"></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
    <div>
      <Dialog header="Temperature-Humidity Table" v-model:visible="displayMaximizable" :style="{ width: '50vw' }" :maximizable="true" :modal="true">
        <p class="p-m-0">
          <DataTable :value="tempHumidityTableData" class="p-datatable-sm" :paginator="true" :rows="10">
            <Column field="temperature" header="Temperature" class="text-sm"></Column>
            <Column field="humidity" header="Humidity" class="text-sm"></Column>
            <Column field="date_time" header="Date Time" class="text-sm"></Column>
          </DataTable>
        </p>
      </Dialog>

      <Dialog header="Tag Data Table" v-model:visible="displayMaximizableTagData" :style="{ width: '50vw' }" :maximizable="true" :modal="true">
        <p class="p-m-0">
          <DataTable :value="tagTableData" class="p-datatable-sm" :paginator="true" :rows="10">
            <Column field="user_name" header="User Name" class="text-sm"></Column>
            <Column field="tag_id" header="Tag ID" class="text-sm"></Column>
             <Column field="tag_remain" header="Remain"></Column>
            <Column field="date_time" header="Date Time" class="text-sm"></Column>
           
          </DataTable>
        </p>
      </Dialog>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject } from "vue";
import { useToast } from "primevue/usetoast";
import DataService from "../services/DataService";
export default {
  name: "Home",
  props: {
    // data: { type: Object },
    user_id: { type: String },
    device_id: { type: String },
    token: { type: String },
  },
  setup(props) {
    const socket = inject("socket");

    const items = ref([
      {
        label: "Home",
        icon: "pi pi-home", 
      },
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
  
      },
      {
        label: "Users",
        icon: "pi pi-fw pi-user",
       
      },
      {
        label: "Tables",
        icon: "pi pi-fw pi-calendar",
        items: [
          {
            label: "Temp-Humidity Log",
            icon: "pi pi-table",
            command: () => {
              tempHumidityClick();
            },
          },
          {   
            label: "Tag Data Log",
            icon: "pi pi-table",
             command: () => {
              tagDataClick();
            },
          },
        ],
      },
      {
        label: "Quit",
        icon: "pi pi-fw pi-power-off",
        command: () => {
          let data = {
            login_user: props.user_id,
            login_device_id: props.device_id,
            socket_id: socket.id,
          };
          socket.emit("client_disconnect", data);
        },
        to: "/",
      },
    ]);

    const toast = useToast();
    const checked1 = ref(false);
    const checked2 = ref(false);
    const login_user = ref();
    const login_device_id = ref();
    const device_online = ref(false);
    const temperature = ref(0);
    const humidity = ref(0);
    const analogueValue = ref(0);
    const infraredValue = ref("OFF");
    const btnTempHumClick = ref(false);
    const tagData = ref({ data: [] });
    const displayMaximizable = ref(false);
    const displayMaximizableTagData = ref(false);
    const tempHumidityTableData=ref();
    const tagTableData=ref();

    const dataService=new DataService();

    onMounted(() => {
      // console.log("props User:", props.token);
      login_user.value = props.user_id;
      login_device_id.value = parseInt(props.device_id, 10).toString(16).toUpperCase();

      let data = {
        login_user: props.user_id,
        login_device_id: props.device_id,
        socket_id: socket.id,
      };
      socket.emit("login-user", data); //request join
    });

    const openMaximizable = () => {
      displayMaximizable.value = true;
    };
    const openMaximizableTagData = () => {
     displayMaximizableTagData.value  = true;
    };

    const closeMaximizable = () => {
      displayMaximizable.value = false;
      displayMaximizableTagData.value =false;
    };

    const tempHumidityClick=()=>{
        let user = {
        login_user: props.user_id,
        login_device_id: props.device_id,
        socket_id: socket.id,
      };
      dataService.getTempHumidityData(user).then((res,err)=>{
         if(!err){
          // console.log("temp Hum Data :",res.rows);
          let arr=res.rows;

          arr.forEach((element) => {
            element.date_time= element.date_time.replace('T', ' ');
            element.date_time=element.date_time.replace('.000Z', '');
          });
          console.log(arr);
           tempHumidityTableData.value=arr;
          openMaximizable();
         }
          
      });
    };
    const tagDataClick=()=>{
        let user = {
        login_user: props.user_id,
        login_device_id: props.device_id,
        socket_id: socket.id,
      };

      dataService.getTagData(user).then((res,err)=>{
         if(!err){
          // console.log("temp Hum Data :",res.rows);
          let arr=res.rows;

          arr.forEach((element) => {
            element.date_time= element.date_time.replace('T', ' ');
            element.date_time=element.date_time.replace('.000Z', '');
          });
          console.log(arr);
          tagTableData.value=arr;
          openMaximizableTagData();
         }
          
      });
    };
    const showSocketMessage = (data) => {
      console.log("showSocketMessage :", data);
      // toast.add({
      //   severity: "success",
      //   summary: "Socket-io",
      //   detail: data,
      //   life: 3000,

      // });
    };

    const btnTempClick = () => {
      socket.emit("temp-humidty", "get");
      showSocketMessage("TEMP CLICK");
      btnTempHumClick.value = true;
    };

    const InputSwitch1Click = () => {
      console.log("InputSwitch1Click:", checked1.value);
      if (!checked1.value) {
        //true

        socket.emit("led1-on", "ON");
      } else {
        socket.emit("led1-off", "OFF");
      }
    };

    const InputSwitch2Click = () => {
      console.log("InputSwitch2Click:", checked2.value);
      if (!checked2.value) {
        //true

        socket.emit("led2-on", "ON");
      } else {
        socket.emit("led2-off", "OFF");
      }
    };

    const relay1Click = () => {
      socket.emit("relay1", "ON-OFF");
      toast.add({
        severity: "success",
        summary: "Socket-io",
        detail: "Realay1 ON-OFF",
        life: 2000,
        group: "br",
      });
    };

    const relay2Click = () => {
      socket.emit("relay2", "ON-OFF");
      toast.add({
        severity: "success",
        summary: "Socket-io",
        detail: "Realay2 ON-OFF",
        life: 2000,
        group: "br",
      });
    };

    socket.on("time_stamp", (data) => {
      console.log("time_stamp:", data);
  
      device_online.value = true;
    });

    socket.on("temp-humidity", (data) => {
      console.log("temp-humidity:", data);
   
      temperature.value = data.temperature;
      humidity.value = data.humidity;

      if (btnTempHumClick.value) {
        toast.add({
          severity: "success",
          summary: "Socket-io",
          detail: temperature.value + "C" + " - " + humidity.value + "%",
          life: 2000,
          group: "br",
        });
        btnTempHumClick.value = false;
      }
    });

    socket.on("analogue-value", (data) => {
      console.log("analogue-value:", data);
      analogueValue.value = data.analogue_value;
    });
    
    socket.on("device-disconnect", () => {
      console.log("disconnect:");
      device_online.value = false;
    });

    socket.on("infrared-value", (data) => {
      console.log("infrared-value:", data);
      infraredValue.value = data.sensor_value;

      beep();

      if (data.sensor_value.includes("ON")) {
        toast.add({
          severity: "success",
          summary: "Socket-io",
          detail: data.sensor_value,
          life: 5000,
          group: "br",
        });
      }
    });

    const rawObject = ref();

    socket.on("tag-data", (data) => {
      console.log("tag-data:", data);
      let obj = data;
      delete obj.login_user;
      delete obj.socket_id;

      tagData.value.data.push(obj); 
      rawObject.value = JSON.parse(JSON.stringify(tagData.value.data)); //find proxy data

      console.log(rawObject);
    });

    function beep(duration, frequency, volume, type, callback) {
      //All arguments are optional:

      //duration of the tone in milliseconds. Default is 500
      //frequency of the tone in hertz. default is 440
      //volume of the tone. Default is 1, off is 0.
      //type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
      //callback to use on end of tone
      //if you have another AudioContext class use that one, as some browsers have a limit
      var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext)();
      var oscillator = audioCtx.createOscillator();
      var gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      if (volume) {
        gainNode.gain.value = volume;
      }
      if (frequency) {
        oscillator.frequency.value = frequency;
      }
      if (type) {
        oscillator.type = type;
      }
      if (callback) {
        oscillator.onended = callback;
      }

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + (duration || 500) / 1000);
    }

    return {
      items,
      checked1,
      checked2,
      login_user,
      login_device_id,
      device_online,
      temperature,
      humidity,
      btnTempClick,
      analogueValue,
      infraredValue,
      InputSwitch1Click,
      InputSwitch2Click,
      relay1Click,
      relay2Click,
      tagData,
      rawObject,
      displayMaximizable,
      openMaximizable,
      closeMaximizable,
      tempHumidityClick,
      tempHumidityTableData,
      tagTableData,
      openMaximizableTagData,
      displayMaximizableTagData ,
    };
  },
};
</script>
