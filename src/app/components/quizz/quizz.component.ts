import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf, NgForOf } from '@angular/common';

import { Component } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"
import { isNgTemplate } from '@angular/compiler';
 
@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [ NgIf, NgForOf, CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {

  title:string = ""
  questions:any = ""
  questionsSelected:any = ""

  answers:string[] = []
  anwersSelectd:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false


  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionsSelected = this.questions[this.questionIndex]

      this.questionMaxIndex = this.questions.length
    }

   
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionsSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.anwersSelectd = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr)=>{
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous
      }else{
        return current
      }
    })
    return result
  }
  
}
