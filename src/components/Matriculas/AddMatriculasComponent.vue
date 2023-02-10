<template>
  <div class="q-pa-lg">
    <q-dialog
      v-model="isMatriculasOpen"
      position="top"
      persistent
      class="w-800 h-700"
    >
      <q-stepper
        v-model="step"
        vertical
        color="primary"
        animated
        class="w-700 h-700"
      >
        <q-step
          :name="1"
          :title="`${formTitle} Información Personal`"
          icon="settings"
          :done="step > 1"
        >
          <div class="row items-center justify-center mb-2">
            <q-uploader :factory="uploadImg" multiple style="max-width: 300px">
              <template v-slot:header="scope">
                <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                  <q-btn
                    v-if="scope.queuedFiles.length > 0"
                    icon="clear_all"
                    @click="scope.removeQueuedFiles"
                    round
                    dense
                    flat
                  >
                    <q-tooltip>Borrar Todo</q-tooltip>
                  </q-btn>
                  <q-btn
                    v-if="scope.uploadedFiles.length > 0"
                    icon="done_all"
                    @click="scope.removeUploadedFiles"
                    round
                    dense
                    flat
                  >
                    <q-tooltip>Eliminar Imagen</q-tooltip>
                  </q-btn>
                  <q-spinner
                    v-if="scope.isUploading"
                    class="q-uploader__spinner"
                  />
                  <div class="col">
                    <div class="q-uploader__title">Cargar Imagen</div>
                    <div class="q-uploader__subtitle">
                      {{ scope.uploadSizeLabel }} /
                      {{ scope.uploadProgressLabel }}
                    </div>
                  </div>
                  <q-btn
                    v-if="scope.canAddFiles"
                    type="a"
                    icon="add_box"
                    @click="scope.pickFiles"
                    round
                    dense
                    flat
                  >
                    <q-uploader-add-trigger />
                    <q-tooltip>Escoja la imagen</q-tooltip>
                  </q-btn>
                  <q-btn
                    v-if="scope.canUpload"
                    icon="cloud_upload"
                    @click="scope.upload"
                    round
                    dense
                    flat
                  >
                    <q-tooltip>Subir la Imagen</q-tooltip>
                  </q-btn>

                  <q-btn
                    v-if="scope.isUploading"
                    icon="clear"
                    @click="scope.abort"
                    round
                    dense
                    flat
                  >
                    <q-tooltip>No subir la Imagen</q-tooltip>
                  </q-btn>
                </div>
              </template>
            </q-uploader>
          </div>
          <div>
            <q-input
              v-if="!matriculasEdit"
              filled
              type="text"
              v-model="datos.nombre"
              label="Nombre"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Escriba su Nombre']"
            >
              <template v-slot:append>
                <q-icon name="las la-user-plus" />
              </template>
            </q-input>

            <q-input
              v-else
              filled
              type="text"
              v-model="todo.nombre"
              label="Nombre"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Escriba su Nombre']"
            >
              <template v-slot:append>
                <q-icon name="las la-user-plus" />
              </template>
            </q-input>
          </div>
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                type="text"
                v-model="datos.apellido1"
                label="1 Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su 1 apellido',
                ]"
              />

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.apellido1"
                label="1 Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su 1 apellido',
                ]"
              />
            </div>
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                type="text"
                v-model="datos.apellido2"
                label="2 Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su 2 apellido',
                ]"
              />

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.apellido2"
                label="2 Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su 2 apellido',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
          </div>
          <div>
            <q-input
              v-if="!matriculasEdit"
              filled
              type="text"
              v-model="datos.ci"
              label="CI"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Escriba su CI']"
            >
              <template v-slot:append>
                <q-icon name="las la-wallet" />
              </template>
            </q-input>

            <q-input
              v-else
              filled
              type="text"
              v-model="todo.ci"
              label="CI"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Escriba su CI']"
            >
              <template v-slot:append>
                <q-icon name="las la-wallet" />
              </template>
            </q-input>
          </div>
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                type="number"
                v-model.number="datos.tomo"
                label="Tomo"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Escriba el tomo']"
              />

              <q-input
                v-else
                filled
                type="number"
                v-model.number="todo.tomo"
                label="Tomo"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Escriba el tomo']"
              />
            </div>
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                type="number"
                v-model.number="datos.folio"
                label="Folio"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el folio',
                ]"
              />

              <q-input
                v-else
                filled
                type="number"
                v-model.number="todo.folio"
                label="folio"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el folio',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn @click="step = 2" color="primary" label="Continuar" />
          </q-stepper-navigation>
        </q-step>
        <q-step
          :name="2"
          title="Otra Información Personal"
          caption="Otros datos"
          icon="create_new_folder"
          :done="step > 2"
        >
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.color_piel"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="ColorPiel"
                label="Color de Piel"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="todo.color_piel"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="ColorPiel"
                label="Color de Piel"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="my-2 w-220px">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.sexo"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="Sexos"
                label="Sexo"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="todo.sexo"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="Sexos"
                label="Sexo"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                type="number"
                v-model.number="datos.edad"
                label="Edad"
                aria-required="true"
              />

              <q-input
                v-else
                filled
                type="number"
                v-model.number="todo.edad"
                label="Edad"
                aria-required="true"
              />
            </div>
            <div class="my-2 w-220px">
              <q-toggle
                v-if="!matriculasEdit"
                size="lg"
                v-model="datos.huerfano"
                checked-icon="check"
                color="red"
                :label="`Huérfano ${datos.huerfano ? 'Si 😭' : 'No 🥰'}`"
                unchecked-icon="clear"
                class="text-xl text-grey"
              />

              <q-toggle
                v-else
                v-model="todo.huerfano"
                checked-icon="check"
                color="red"
                :label="`Huérfano ${datos.huerfano ? 'Si 😭' : 'No 🥰'}`"
                unchecked-icon="clear"
                class="text-xl text-grey"
              />
            </div>
          </div>
          <div>
            <q-input
              v-if="!matriculasEdit"
              filled
              type="text"
              v-model="datos.domicilio"
              label="Domicilio"
              autogrow
              class="min-h-30"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Escriba su Domicilio',
              ]"
            />
            <q-input
              v-else
              filled
              type="text"
              v-model="todo.domicilio"
              label="Domicilio"
              autogrow
              class="min-h-30"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Escriba su Domicilio',
              ]"
            />
          </div>
          <q-stepper-navigation>
            <q-btn @click="step = 3" color="primary" label="Continuar" />
            <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="Ad template"
          icon="assignment"
          :done="step > 3"
        >
          <!-- FEcha y fecha de nacimiento -->
          <div class="fit row wrap justify-between my-2">
            <div class="w-57">
              <q-input
                v-if="!matriculasEdit"
                type="text"
                filled
                label="Fecha de nacimiento"
                v-model="datos.fecha_nacimiento"
              >
                <template v-slot:append>
                  <q-btn icon="event" round color="primary">
                    <q-popup-proxy
                      @before-show="updateProxyFN"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="proxyDateFN">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="saveFN"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-input>

              <q-input
                v-else
                type="text"
                filled
                label="Fecha de nacimiento"
                v-model="todo.fecha_nacimiento"
              >
                <template v-slot:append>
                  <q-btn icon="event" round color="primary">
                    <q-popup-proxy
                      @before-show="updateProxyFN"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="proxyDateFN">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="saveFN"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-input>
            </div>
            <div class="w-57">
              <q-input
                v-if="!matriculasEdit"
                type="text"
                filled
                label="Fecha"
                v-model="datos.fecha"
              >
                <template v-slot:append>
                  <q-btn icon="event" round color="primary">
                    <q-popup-proxy
                      @before-show="updateProxyFN"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="proxyDateFN">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="saveFN"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-input>
              <q-input
                v-else
                type="text"
                filled
                label="Fecha"
                v-model="todo.fecha"
              >
                <template v-slot:append>
                  <q-btn icon="event" round color="primary">
                    <q-popup-proxy
                      @before-show="updateProxyFN"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="proxyDateFN">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="saveFN"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-input>
            </div>
          </div>
          <!-- Fin fecha nacinmiento -->

          <!-- Provincia y pais de nacimiento -->
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.provincia"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsProvincias"
                @filter="filterFnProvincias"
                option-value="id"
                option-label="provincia"
                label="Provincia"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="todo.provincia"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsProvincias"
                @filter="filterFnProvincias"
                option-value="id"
                option-label="provincia"
                label="Provincia"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="my-2 w-220px">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.pais_nacimiento"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsPais"
                @filter="filterFnPais"
                option-value="id"
                option-label="pais"
                label="País"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="todo.pais_nacimiento"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsPais"
                @filter="filterFnPais"
                option-value="id"
                option-label="pais"
                label="País"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <!-- fin de pais y provincia -->
          <!-- CIUDAD Y NACIONALIDAD -->
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.ciudad_nacimiento"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsMunicipio"
                @filter="filterFnMunicipio"
                option-value="id"
                option-label="municipio"
                label="Ciudad de Nacimiento"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="todo.ciudad_nacimiento"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsMunicipio"
                @filter="filterFnMunicipio"
                option-value="id"
                option-label="municipio"
                label="Ciudad de Nacimiento"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                v-model="datos.nacionalidad"
                label="Nacionalidad"
              />

              <q-input
                v-else
                filled
                v-model="todo.nacionalidad"
                label="Nacionalidad"
              />
            </div>
          </div>
          <!--FIN CIUDAD Y NACIONALIDAD -->
          <q-stepper-navigation>
            <q-btn @click="step = 4" color="primary" label="continuar" />
            <q-btn
              flat
              @click="step = 2"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="4" title="Información Civil" icon="add_comment">
          <!-- Estado civil y registro civol -->
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                v-model="datos.estado_civil"
                use-input
                label="Estado civil"
              />

              <q-input
                v-else
                filled
                v-model="todo.estado_civil"
                use-input
                label="Estado civil"
              />
            </div>
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                v-model="datos.registro_civil"
                label="Registro Civil"
              />

              <q-input
                v-else
                filled
                v-model="todo.registro_civil"
                label="Registro Civil"
              />
            </div>
          </div>
          <!--FIN Estadi civil y registro civil -->

          <!-- Sin Sancion y Sancionado -->
          <div
            class="my-2 flex justify-between col-md-6 col-xs-12 col-sm-6 self-stretch"
          >
            <div class="my-2 w-220px">
              <q-toggle
                v-if="!matriculasEdit"
                v-model="datos.sin_sancion"
                checked-icon="check"
                color="red"
                :label="`Tiene sanción ${datos.sin_sancion ? 'Si' : 'No'}`"
                unchecked-icon="clear"
                class="text-xl text-grey align-middle"
              />

              <q-toggle
                v-else
                v-model="todo.sin_sancion"
                checked-icon="check"
                color="red"
                :label="`Tiene sanción ${datos.sin_sancion ? 'Si' : 'No'}`"
                unchecked-icon="clear"
                class="text-xl text-grey align-middle"
              />
            </div>
            <div class="my-2 w-220px">
              <q-input
                v-if="!matriculasEdit"
                filled
                v-model="datos.sancionado"
                label="Sanción"
                :disable="!datos.sin_sancion"
              />

              <q-input
                v-else
                filled
                v-model="todo.sancionado"
                label="Sanción"
                :disable="!datos.sin_sancion"
              />
            </div>
          </div>
          <!--FIN Sin sancion y sancionado -->

          <!-- discapacida serie letra serie nueros -->
          <div class="my-2">
            <q-input
              v-if="!matriculasEdit"
              filled
              v-model="datos.discapacidad"
              label="Discapacidad"
            />

            <q-input
              v-else
              filled
              v-model="todo.discapacidad"
              label="Discapacidad"
            />
          </div>
          <div class="my-2">
            <q-input
              v-if="!matriculasEdit"
              filled
              v-model="datos.serie_letras"
              label="Serie Letras"
            />

            <q-input
              v-else
              filled
              v-model="todo.serie_letras"
              label="Serie Letras"
            />
          </div>
          <div class="my-2">
            <q-input
              v-if="!matriculasEdit"
              filled
              v-model="datos.serie_numero"
              label="Serie Números"
            />

            <q-input
              v-else
              filled
              v-model="todo.serie_numero"
              label="Serie Números"
            />
          </div>
          <div class="my-2">
            <q-input
              v-if="!matriculasEdit"
              filled
              v-model="datos.orgacizaciones"
              label="Organizaciones"
            />

            <q-input
              v-else
              filled
              v-model="todo.orgacizaciones"
              label="Organizaciones"
            />
          </div>
          <!--Fin discapacida serie letra serie nueros -->
          <q-stepper-navigation>
            <q-btn @click="step = 5" color="primary" label="continuar" />
            <q-btn
              flat
              @click="step = 3"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>
        <q-step
          :name="5"
          title="Información Académica y otras"
          icon="add_comment"
        >
          <div class="fit row wrap justify-center items-start content-start">
            <q-input
              v-if="!matriculasEdit"
              type="text"
              rounded
              filled
              label="Curso Escolar"
              v-model="datos.curso_escolar"
              class="text-center align-justify"
            />

            <q-input
              v-else
              type="text"
              rounded
              filled
              label="Curso Escolar"
              v-model="todo.curso_escolar"
            />
          </div>

          <!-- Carrera y facultades -->
          <div class="fit row wrap justify-between my-2">
            <div class="w-57">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.carrera"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsCarreras"
                @filter="filterFnCarrera"
                option-value="id"
                option-label="carrera"
                label="Carrera"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="todo.carrera"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsCarreras"
                @filter="filterFnCarrera"
                option-value="id"
                option-label="carrera"
                label="Carrera"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="w-57">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.facultad"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsFacultad"
                @filter="filterFnFacultad"
                option-value="id"
                option-label="facultad"
                label="Facultad"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="todo.facultad"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsPais"
                @filter="filterFnPais"
                option-value="id"
                option-label="pais"
                label="Facultad"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <!-- FIN carrera y facultades -->
          <!-- FEcha y fecha de nacimiento -->
          <div class="fit row wrap justify-between my-2">
            <div class="w-57">
              <q-input
                v-if="!matriculasEdit"
                type="text"
                filled
                label="Fecha de matricula"
                v-model="datos.fecha_matricula"
              >
                <template v-slot:append>
                  <q-btn icon="event" round color="primary">
                    <q-popup-proxy
                      @before-show="updateProxyMatricula"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="proxyDateMatricula">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="saveMatricula"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-input>

              <q-input
                v-else
                type="text"
                filled
                label="Fecha de matricula"
                v-model="todo.fecha_matricula"
              >
                <template v-slot:append>
                  <q-btn icon="event" round color="primary">
                    <q-popup-proxy
                      @before-show="updateProxyMatricula"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="proxyDateMatricula">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="saveMatricula"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-input>
            </div>
            <div class="w-57">
              <q-input
                v-if="!matriculasEdit"
                type="text"
                filled
                label="Fecha de ingreso a este CES"
                v-model="datos.fecha_ingreso_este_ces"
              >
                <template v-slot:append>
                  <q-btn icon="event" round color="primary">
                    <q-popup-proxy
                      @before-show="updateProxyEsteCes"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="proxyDateEsteCes">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="saveEsteCes"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-input>
              <q-input
                v-else
                type="text"
                filled
                label="Fecha de ingreso a este CES"
                v-model="todo.fecha_ingreso_este_ces"
              >
                <template v-slot:append>
                  <q-btn icon="event" round color="primary">
                    <q-popup-proxy
                      @before-show="updateProxyEsteCes"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="proxyDateEsteCes">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="saveEsteCes"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-input>
            </div>
          </div>
          <!-- Fin fecha matricula fechaingreso este ces -->

          <!-- FEcha ingreso edu superior y centro educacion superiro -->
          <div class="fit row wrap justify-between my-2">
            <div class="w-57">
              <q-input
                v-if="!matriculasEdit"
                type="text"
                filled
                label="Fecha de ingreso Educación Superior"
                v-model="datos.fecha_ingreso_edu_super"
              >
                <template v-slot:append>
                  <q-btn icon="event" round color="primary">
                    <q-popup-proxy
                      @before-show="updateProxyEduSuper"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="proxyDateEduSuper">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="saveEduSuper"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-input>

              <q-input
                v-else
                type="text"
                filled
                label="Fecha de ingreso Educación Superior"
                v-model="todo.fecha_ingreso_edu_super"
              >
                <template v-slot:append>
                  <q-btn icon="event" round color="primary">
                    <q-popup-proxy
                      @before-show="updateProxyEduSuper"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="proxyDateEduSuper">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="saveEduSuper"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </template>
              </q-input>
            </div>
            <div class="w-57">
              <q-input
                v-if="!matriculasEdit"
                type="text"
                filled
                label="Centro de Educación Superior"
                v-model="datos.centro_edicacion_superior"
              />

              <q-input
                v-else
                type="text"
                filled
                label="Centro de Educación Superior"
                v-model="todo.centro_edicacion_superior"
              />
            </div>
          </div>
          <!-- FIN ingreso y educacion superior-->

          <!-- anno acaedmico y tipo de curso -->
          <div class="fit row wrap justify-between my-2">
            <div class="w-57">
              <q-input
                v-if="!matriculasEdit"
                type="text"
                filled
                label="Año Académico"
                v-model="datos.anno_academico"
              />

              <q-input
                v-else
                type="text"
                filled
                label="Año Académico"
                v-model="todo.anno_academico"
              />
            </div>
            <div class="w-57">
              <q-input
                v-if="!matriculasEdit"
                type="text"
                filled
                label="Tipo de curso"
                v-model="datos.tipo_curso"
              />

              <q-input
                v-else
                type="text"
                filled
                label="Tipo de curso"
                v-model="todo.tipo_curso"
              />
            </div>
          </div>
          <!-- FIN  anno academico type curso-->

          <!-- Situacion escolar y clasde estudiante -->
          <div class="fit row wrap justify-between my-2">
            <div class="w-57">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.situacion_escolar"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="SituacionEscolarAlMatricular"
                label="Situación Escolar"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="todo.situacion_escolar"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="SituacionEscolarAlMatricular"
                label="Situación Escolar"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="w-57">
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.clase_estudiante"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="ClaseEstudiante"
                label="Clase de Estudiante"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="todo.clase_estudiante"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="ClaseEstudiante"
                label="Clase de Estudiante"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>
          <!-- FIN Situacion escolar y clasde estudiante -->
          <!-- nunca matriculado, no matriculado, no graduado -->
          <div class="fit row wrap justify-evenly items-center mx-auto">
            <div class="">
              <q-checkbox
                v-if="!matriculasEdit"
                size="md"
                val="md"
                left-label
                v-model="datos.nunca_matriculado"
                :label="`Matriculado alguna vez? ${
                  datos.nunca_matriculado ? 'Nunca' : 'SI'
                }`"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
              />
              <q-checkbox
                v-else
                size="md"
                val="md"
                left-label
                v-model="todo.nunca_matriculado"
                :label="`Matriculado alguna vez? ${
                  todo.nunca_matriculado ? 'Nunca' : 'SI'
                }`"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
              />
              <q-checkbox
                v-if="!matriculasEdit"
                size="md"
                val="md"
                left-label
                v-model="datos.no_estoy_matriculado"
                :label="`Matriculado? ${
                  datos.no_estoy_matriculado ? 'NO' : 'SI'
                }`"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
              />
              <q-checkbox
                v-else
                size="md"
                val="md"
                left-label
                v-model="todo.no_estoy_matriculado"
                :label="`Matriculado? ${
                  todo.no_estoy_matriculado ? 'SI' : 'NO'
                }`"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
              />
              <q-checkbox
                v-if="!matriculasEdit"
                size="md"
                val="md"
                left-label
                v-model="datos.no_soy_graduado"
                :label="`Graduado? ${datos.no_soy_graduado ? 'SI' : 'NO'}`"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
              />
              <q-checkbox
                v-else
                size="md"
                val="md"
                left-label
                v-model="todo.no_soy_graduado"
                :label="`Graduado? ${todo.no_soy_graduado ? 'SI' : 'NO'}`"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
              />
            </div>
          </div>
          <div class="fit row wrap justify-between">
            <div
              class="col-6 col-xs-12 col-sm-6 col-md-6 q-gutter-xs q-col-gutter-xs"
            >
              <q-select
                v-if="!matriculasEdit"
                filled
                v-model="datos.procedencia_escolar"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="ProcedenciaEscolar"
                label="Procedencia Escolar"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="todo.procedencia_escolar"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="ProcedenciaEscolar"
                label="Procedencia Escolar"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div
              class="col-6 col-xs-12 col-sm-6 col-md-6 q-gutter-xs q-col-gutter-xs"
            >
              <q-input
                v-if="!matriculasEdit"
                filled
                v-model="datos.estuve_matriculado"
                label="Estuve Matriculado en:"
                :disable="datos.nunca_matriculado"
              />

              <q-input
                v-else
                filled
                v-model="todo.estuve_matriculado"
                label="Estuve Matriculado en:"
                :disable="datos.nunca_matriculado"
              />
            </div>
          </div>
          <!--FIM nunca matriculado, no matriculado, no graduado -->
          <q-stepper-navigation>
            <div
              class="rows items-center justify-between col-xs-12 col-md-4 q-col-gutter-xs"
            >
              <q-btn
                color="primary"
                class="q-ml-sm"
                :label="`${formTitle}`"
                @click="add"
              />
              <q-btn
                flat
                @click="step = 4"
                color="primary"
                label="Back"
                class="q-ml-sm"
              />
              <q-btn
                flat
                color="red"
                label="Cerrar"
                class="q-ml-sm"
                @click="cerrar"
              />
            </div>
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMatriculastore } from '../../stores/matriculas/matriculas-store';
import { MatriculasProps } from '../../interfaces/matriculas.interfaces';
import { ProvinciaList } from 'src/interfaces/provincias.interfaces';
import { useMunicipiosStore } from 'src/stores/municipios/municipios-store';
import { MunicipioList } from 'src/interfaces/municipios.interfaces';
import { useProvinciasStore } from 'src/stores/provincias/pr0vincias-store';
import { useNomencladoresStore } from 'src/stores/nomencladores/nomencladores-store';
import { usePaisesStore } from 'src/stores/paises/paises-store';
import { PaisList } from 'src/interfaces/pais.interfaces';
import { useCarreraStore } from 'src/stores/carrera/carrera-store';
import { useFacultadStore } from 'src/stores/facultad/facultad-store';
import { CarreraList } from 'src/interfaces/carrera.interfaces';
import { FaculList } from 'src/interfaces/facultad.interfaces';

const { addMatriculas, isMatriculasToggle, editandoForm, fecthMatriculas } =
  useMatriculastore();
const { isMatriculasOpen, matriculasEdit } = storeToRefs(useMatriculastore());
const { municipios } = storeToRefs(useMunicipiosStore());
const { provincias } = storeToRefs(useProvinciasStore());
const { paises } = storeToRefs(usePaisesStore());
const { carrera } = storeToRefs(useCarreraStore());
const { facultad } = storeToRefs(useFacultadStore());
const {
  ColorPiel,
  Sexos,
  SituacionEscolarAlMatricular,
  ClaseEstudiante,
  ProcedenciaEscolar,
} = storeToRefs(useNomencladoresStore());

//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !matriculasEdit.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isMatriculasToggle();
  editandoForm(false);
};

//STEPS
const step = ref(1);

//Insertar usuario

const datos = ref({
  id: '',
  centro_edicacion_superior: '',
  curso_escolar: '',
  facultad: '',
  carrera: '',
  foto: '',
  anno_academico: '',
  tipo_curso: '',
  fecha_matricula: new Date().toISOString().substring(0, 10),
  fecha_ingreso_este_ces: new Date().toISOString().substring(0, 10),
  fecha_ingreso_edu_super: new Date().toISOString().substring(0, 10),
  ci: '',
  serie_letras: '',
  serie_numero: '',
  tomo: 0,
  folio: 0,
  anno_ci: 0,
  fecha_nacimiento: new Date().toISOString().substring(0, 10),
  edad: 0,
  nombre: '',
  apellido1: '',
  apellido2: '',
  sexo: '',
  color_piel: '',
  ciudad_nacimiento: '',
  pais_nacimiento: '',
  nacionalidad: '',
  orgacizaciones: '',
  estado_civil: '',
  huerfano: false,
  discapacidad: '',
  situacion_escolar: '',
  clase_estudiante: '',
  procedencia_escolar: '',
  domicilio: '',
  registro_civil: '',
  provincia: '',
  fecha: new Date().toISOString().substring(0, 10),
  sin_sancion: true,
  sancionado: '',
  nunca_matriculado: true,
  estuve_matriculado: '',
  no_estoy_matriculado: true,
  no_soy_graduado: false,
  aceptado: false,
});

//!! datos de las fechas !!//
const proxyDateFN = ref(new Date().toISOString());
const proxyDateMatricula = ref(new Date().toISOString());
const proxyDateEsteCes = ref(new Date().toISOString());
const proxyDateEduSuper = ref(new Date().toISOString());

//? funciones fechas update
const updateProxyFN = () => {
  proxyDateFN.value = datos.value.fecha_nacimiento;
};
const updateProxyMatricula = () => {
  proxyDateMatricula.value = datos.value.fecha_matricula;
};
const updateProxyEsteCes = () => {
  proxyDateEsteCes.value = datos.value.fecha_ingreso_este_ces;
};
const updateProxyEduSuper = () => {
  proxyDateEduSuper.value = datos.value.fecha_ingreso_edu_super;
};

//? funciones fechas salvar
const saveEduSuper = () => {
  datos.value.fecha_ingreso_edu_super = proxyDateEduSuper.value;
};
const saveEsteCes = () => {
  datos.value.fecha_ingreso_este_ces = proxyDateEsteCes.value;
};
const saveMatricula = () => {
  datos.value.fecha_matricula = proxyDateMatricula.value;
};
const saveFN = () => {
  datos.value.fecha_nacimiento = proxyDateFN.value;
};

let optionsMunicipio = ref(municipios);
let filterFnMunicipio = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsMunicipio.value = municipios.value
        ?.map((value: MunicipioList) => {
          return {
            id: value.id,
            municipio: value.municipio,
            codigo: value.codigo,
          };
        })
        .filter((v) => v.municipio);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsMunicipio.value = municipios.value
      ?.map((value: MunicipioList) => {
        return {
          id: value.id,
          municipio: value.municipio,
          codigo: value.codigo,
        };
      })
      .filter((v) => v.municipio.toLowerCase().indexOf(needle) > -1);
  });
};

// provinias
let optionsProvincias = ref(provincias);
let filterFnProvincias = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsProvincias.value = provincias.value
        ?.map((value: ProvinciaList) => {
          return {
            id: value.id,
            provincia: value.provincia,
            codigo: value.codigo,
          };
        })
        .filter((v) => v.provincia);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsProvincias.value = provincias.value
      ?.map((value: ProvinciaList) => {
        return {
          id: value.id,
          provincia: value.provincia,
          codigo: value.codigo,
        };
      })
      .filter((v) => v.provincia.toLowerCase().indexOf(needle) > -1);
  });
};

// pais
let optionsPais = ref(paises);
let filterFnPais = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsPais.value = paises.value
        ?.map((value: PaisList) => {
          return {
            id: value.id,
            pais: value.pais,
            codigo: value.codigo,
          };
        })
        .filter((v) => v.pais);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsPais.value = paises.value
      ?.map((value: PaisList) => {
        return {
          id: value.id,
          pais: value.pais,
          codigo: value.codigo,
        };
      })
      .filter((v) => v.pais);
  });
};

// carreras
let optionsCarreras = ref(carrera);
let filterFnCarrera = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsCarreras.value = carrera.value
        ?.map((value: CarreraList) => {
          return {
            id: value.id,
            carrera: value.carrera,
          };
        })
        .filter((v) => v.carrera);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsCarreras.value = carrera.value
      ?.map((value: CarreraList) => {
        return {
          id: value.id,
          carrera: value.carrera,
        };
      })
      .filter((v) => v.carrera);
  });
};

// facultad
let optionsFacultad = ref(facultad);
let filterFnFacultad = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsFacultad.value = facultad.value
        ?.map((value: FaculList) => {
          return {
            id: value.id,
            facultad: value.facultad,
          };
        })
        .filter((v) => v.facultad);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsFacultad.value = facultad.value
      ?.map((value: FaculList) => {
        return {
          id: value.id,
          facultad: value.facultad,
        };
      })
      .filter((v) => v.facultad);
  });
};

const file = ref(null);
const uploadImg = (file: any) => {
  return {
    url: `${process.env.API_URL}/files/upload`,
    method: 'POST',
    body: {
      file: datos.value.foto,
    },
  };
};
const add = async () => {
  let dto = {
    centro_edicacion_superior: datos.value.centro_edicacion_superior,
    curso_escolar: datos.value.curso_escolar,
    facultad: datos.value.facultad.facultad,
    carrera: datos.value.carrera.carrera,
    foto: datos.value.foto,
    anno_academico: datos.value.anno_academico,
    tipo_curso: datos.value.tipo_curso,
    fecha_matricula: datos.value.fecha_matricula,
    fecha_ingreso_este_ces: datos.value.fecha_ingreso_este_ces,
    fecha_ingreso_edu_super: datos.value.fecha_ingreso_edu_super,
    ci: datos.value.ci,
    serie_letras: datos.value.serie_letras,
    serie_numero: datos.value.serie_numero,
    tomo: datos.value.tomo,
    folio: datos.value.folio,
    anno_ci: datos.value.anno_ci,
    fecha_nacimiento: datos.value.fecha_nacimiento,
    edad: datos.value.edad,
    nombre: datos.value.nombre,
    apellido1: datos.value.apellido1,
    apellido2: datos.value.apellido2,
    sexo: datos.value.sexo,
    color_piel: datos.value.color_piel,
    ciudad_nacimiento: datos.value.ciudad_nacimiento.municipio,
    pais_nacimiento: datos.value.pais_nacimiento.pais,
    nacionalidad: datos.value.nacionalidad,
    orgacizaciones: datos.value.orgacizaciones,
    estado_civil: datos.value.estado_civil,
    huerfano: datos.value.huerfano,
    discapacidad: datos.value.discapacidad,
    situacion_escolar: datos.value.situacion_escolar,
    clase_estudiante: datos.value.clase_estudiante,
    procedencia_escolar: datos.value.procedencia_escolar,
    domicilio: datos.value.domicilio,
    registro_civil: datos.value.registro_civil,
    provincia: datos.value.provincia.provincia,
    fecha: datos.value.fecha,
    sin_sancion: datos.value.sin_sancion,
    sancionado: datos.value.sancionado,
    nunca_matriculado: datos.value.nunca_matriculado,
    estuve_matriculado: datos.value.estuve_matriculado,
    no_estoy_matriculado: datos.value.no_estoy_matriculado,
    no_soy_graduado: datos.value.no_soy_graduado,
    aceptado: datos.value.aceptado,
  };
  await addMatriculas(dto);
  console.log(dto);
  await fecthMatriculas();
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  matriculasUpd?: MatriculasProps;
}

const props = withDefaults(defineProps<Props>(), {
  matriculasUpd: () => {
    return {
      id: '',
      centro_edicacion_superior: '',
      curso_escolar: '',
      facultad: '',
      carrera: '',
      foto: '',
      anno_academico: '',
      tipo_curso: '',
      fecha_matricula: new Date().toISOString().substring(0, 10),
      fecha_ingreso_este_ces: new Date().toISOString().substring(0, 10),
      fecha_ingreso_edu_super: new Date().toISOString().substring(0, 10),
      ci: '',
      serie_letras: '',
      serie_numero: '',
      tomo: 0,
      folio: 0,
      anno_ci: 0,
      fecha_nacimiento: new Date().toISOString().substring(0, 10),
      edad: 0,
      nombre: '',
      apellido1: '',
      apellido2: '',
      sexo: '',
      color_piel: '',
      ciudad_nacimiento: '',
      pais_nacimiento: '',
      nacionalidad: '',
      orgacizaciones: '',
      estado_civil: '',
      huerfano: false,
      discapacidad: '',
      situacion_escolar: '',
      clase_estudiante: '',
      procedencia_escolar: '',
      domicilio: '',
      registro_civil: '',
      provincia: '',
      fecha: new Date().toISOString().substring(0, 10),
      sin_sancion: true,
      sancionado: '',
      nunca_matriculado: true,
      estuve_matriculado: '',
      no_estoy_matriculado: true,
      no_soy_graduado: false,
      aceptado: false,
    };
  },
});
const todo = computed(() => props.matriculasUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  // await actualizarUsuario(todo.value);
  // await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR
</script>
