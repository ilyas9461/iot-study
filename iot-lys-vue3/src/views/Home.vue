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
              <!-- <Column field="date_time" header="Date-Time"></Column> -->
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject } from "vue";
import { useToast } from "primevue/usetoast";
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
        label: "File",
        icon: "pi pi-fw pi-file",
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-plus",
            items: [
              {
                label: "Bookmark",
                icon: "pi pi-fw pi-bookmark",
              },
              {
                label: "Video",
                icon: "pi pi-fw pi-video",
              },
            ],
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-trash",
          },
          {
            separator: true,
          },
          {
            label: "Export",
            icon: "pi pi-fw pi-external-link",
          },
        ],
      },
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        items: [
          {
            label: "Left",
            icon: "pi pi-fw pi-align-left",
          },
          {
            label: "Right",
            icon: "pi pi-fw pi-align-right",
          },
          {
            label: "Center",
            icon: "pi pi-fw pi-align-center",
          },
          {
            label: "Justify",
            icon: "pi pi-fw pi-align-justify",
          },
        ],
      },
      {
        label: "Users",
        icon: "pi pi-fw pi-user",
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-user-plus",
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-user-minus",
          },
          {
            label: "Search",
            icon: "pi pi-fw pi-users",
            items: [
              {
                label: "Filter",
                icon: "pi pi-fw pi-filter",
                items: [
                  {
                    label: "Print",
                    icon: "pi pi-fw pi-print",
                  },
                ],
              },
              {
                icon: "pi pi-fw pi-bars",
                label: "List",
              },
            ],
          },
        ],
      },
      {
        label: "Events",
        icon: "pi pi-fw pi-calendar",
        items: [
          {
            label: "Edit",
            icon: "pi pi-fw pi-pencil",
            items: [
              {
                label: "Save",
                icon: "pi pi-fw pi-calendar-plus",
              },
              {
                label: "Delete",
                icon: "pi pi-fw pi-calendar-minus",
              },
            ],
          },
          {
            label: "Archieve",
            icon: "pi pi-fw pi-calendar-times",
            items: [
              {
                label: "Remove",
                icon: "pi pi-fw pi-calendar-minus",
              },
            ],
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

    onMounted(() => {

      login_user.value = props.user_id;
      login_device_id.value = parseInt(props.device_id, 10).toString(16).toUpperCase();

      let data = {
        login_user: props.user_id,
        login_device_id: props.device_id,
        socket_id: socket.id,
      };
      socket.emit("login-user", data); //request join
    });

    const showSocketMessage = (data) => {
      console.log("showSocketMessage :", data);
    };

    const btnTempClick = () => {
      socket.emit("temp-humidty", "get");
      showSocketMessage("TEMP CLICK");
      btnTempHumClick.value = true;
    };

    const InputSwitch1Click = () => {
      console.log("InputSwitch1Click:", checked1.value);
      if (!checked1.value) {
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

      tagData.value.data.push(obj); //proxy değer oluşturuyor bundan dolayı tablo ya nesne dönmüyor
      // data yı object yapmak için :
      rawObject.value = JSON.parse(JSON.stringify(tagData.value.data)); //find proxy data

      console.log(rawObject);
    });

    function beep(duration, frequency, volume, type, callback) {
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
    };
  },
};
</script>
