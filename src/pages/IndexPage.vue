<template>
  <q-page padding>
    <div class="row justify-evenly q-col-gutter-sm">
      <q-card flat>
        <img class="my-banner" src="~/assets/images/University.jpg" />

        <q-card-section>
          <div class="text-h6 text-center">
            {{ escuela?.nombre ? escuela?.nombre : 'Cargando...' }}
          </div>
          <div class="text-subtitle2 q-mb-lg">Gestión de Matrículas</div>
          <div class="row justify-evenly q-col-gutter-sm">
            <div class="row justify-evenly col-md-4 col-xs-12">
              <q-card class="my-card">
                <q-card-section horizontal>
                  <q-img class="col-5" src="~/assets/images/PreMatricula.png" />

                  <q-card-section class="text-justify text-wrap">
                    {{ escuela?.pre_desc ? escuela?.pre_desc : 'Cargando...' }}
                  </q-card-section>
                </q-card-section>

                <q-separator />

                <q-card-actions class="justify-center">
                  <q-btn flat round icon="event" />
                  <q-btn flat>
                    {{
                      escuela?.pre_inicio ? escuela?.pre_inicio : 'Cargando...'
                    }}</q-btn
                  >
                  <q-btn flat>
                    {{ escuela?.pre_fin ? escuela?.pre_fin : 'Cargando...' }}
                  </q-btn>
                  <q-btn flat color="primary"> Matricular </q-btn>
                </q-card-actions>
              </q-card>
            </div>
            <div class="row justify-evenly col-md-4 col-xs-12">
              <q-card class="my-card">
                <q-card-section horizontal>
                  <q-img
                    class="col-5"
                    sizes="lg"
                    src="~/assets/images/Matricula.png"
                  />

                  <q-card-section class="text-justify text-wrap">
                    {{ escuela?.mat_desc ? escuela?.mat_desc : 'Cargando...' }}
                  </q-card-section>
                </q-card-section>

                <q-separator />

                <q-card-actions class="justify-center">
                  <q-btn flat round icon="event" />
                  <q-btn flat>
                    {{
                      escuela?.mat_inicio ? escuela?.mat_inicio : 'Cargando...'
                    }}</q-btn
                  >
                  <q-btn flat>
                    {{ escuela?.mat_fin ? escuela?.mat_fin : 'Cargando...' }}
                  </q-btn>
                  <q-btn flat color="primary"> Matricular </q-btn>
                </q-card-actions>
              </q-card>
            </div>
            <div class="row justify-evenly col-md-4 col-xs-12">
              <q-card class="my-card">
                <q-card-section horizontal>
                  <q-img
                    sizes="md"
                    class="col-5"
                    src="~/assets/images/MatriculaPostgrado.png"
                  />

                  <q-card-section class="text-justify text-wrap">
                    {{ escuela?.pos_desc ? escuela?.pos_desc : 'Cargando...' }}
                  </q-card-section>
                </q-card-section>

                <q-separator />

                <q-card-actions class="justify-center">
                  <q-btn flat round icon="event" />
                  <q-btn flat>
                    {{
                      escuela?.pos_inicio ? escuela?.pos_inicio : 'Cargando...'
                    }}</q-btn
                  >
                  <q-btn flat>
                    {{ escuela?.pos_fin ? escuela?.pos_fin : 'Cargando...' }}
                  </q-btn>
                  <q-btn flat color="primary"> Matricular </q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <q-separator class="q-my-md" />

        <q-card-section class="q-pt-none text-justify q-ma-xs text-body1">
          {{ escuela.descripcion ? escuela?.descripcion : 'Cargando...' }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useEscuelaStore } from 'src/stores/escuela/escuela';

const { getActiveEscuela } = useEscuelaStore();
const { escuela } = storeToRefs(useEscuelaStore());

onMounted(() => {
  getActiveEscuela();
});

console.log('escuela', escuela);

// const premat =
//   'Realice su prematrícula para la carrera de su preferencia. Usted puede optar por 3 carreras y se le será asignada una según sus losgros en las pruebas de ingreso, definiendo su posición en el escalafón de postulantes, su nota alcanzada en dichos exámenes.';
// const matric =
//   'Una vez alcanzado una carrera, ya sea por el Preuniversitario o por curso por encuentro, deberá realizar su matrícula oficial en la carrera de su facultad. No podrá iniciar el curso sin antes haber realizado dicha matrícula en la fecha designada.';
// const posmat =
//   'Matricular en los cursos de postgrado disponibles para graduados universitarios. Solicite las planillas relacionadas y asegure los documentos e información que se necesitan para realizar la matrícula. Debe realizar estas operaciones antes de la fecha límite.';
// const descrip =
//   'La Educación Superior en la Isla de la Juventud es hija de la Revolución Cubana. Sus primeros pasos datan de 1972, con la creación del destacamento pedagógico “Manuel Ascunce Domenech”, como una unidad docente asistida metodológicamente por el Instituto Superior Pedagógico “Enrique José Varona”, perteneciente a la Universidad de La Habana. Unidad docente que tuvo como objeto social atender la formación de docentes de nivel universitario, tanto en el Plan de Formación de Profesores para la Enseñanza General Media como en el curso regular para trabajadores. Desde su inicio se formaron estudiantes en el Curso Regular Diurno en las carreras de Física, Matemática, Biología, Geografía, Química, Historia, Español, Inglés y Educación Laboral.';
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
.my-banner
  height: 100%
  max-height: 300px
  width: 99.5%
</style>
